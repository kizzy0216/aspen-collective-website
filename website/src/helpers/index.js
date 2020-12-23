import { TezosNodeReader, TezosNodeWriter, TezosConseilClient, TezosMessageUtils, Tzip7ReferenceTokenHelper } from 'conseiljs';
import { KeyStoreUtils, SoftSigner } from 'conseiljs-softsigner';
import { ConseilQueryBuilder, ConseilOperator, ConseilSortDirection } from 'conseiljs';

const tezosServerUrl = 'https://tezos-prod.cryptonomic-infra.tech:443';
const conseilServerConfig = { url: 'https://conseil-prod.cryptonomic-infra.tech:443', apiKey: 'galleon', network: 'mainnet' };
const uteContractAddress = 'KT1PzkxU8UC4Py85VxbbrHyiJ57Bknjom3r2';

// Constants
const TEZOS_INITIAL_BALANCE = 1 * 1000000;
const FEE_MAINNET = 27000;
const GAS_MAINNET = 100000;
const FREIGHT_MAINNET = 100;
const NETWORKTIME_MAINNET = 61;
const FEE_TESTNET = 27000;
const GAS_TESTNET = 100000;
const FREIGHT_TESTNET = 100;
const NETWORKTIME_TESTNET = 31;

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * This creates a wallet. The KeyStore object should be saved on device securely.
 * The wallet should be created only once, during the first startup after a fresh install.
 */
export const getNewWallet = async () => {
    return { "status": true, "data": await KeyStoreUtils.generateIdentity(), "key": "getNewWallet" }
}

/**
 * This returns the UTE token balance for the user
 */
export const getUteBalance = async (publicKeyHash) => {
    return new Promise(async (resolve, reject) => {
        let balance = 0.00;
        try {
            const storage = await Tzip7ReferenceTokenHelper.getSimpleStorage(tezosServerUrl, uteContractAddress);
            const mapId = storage.mapid;
            balance = await Tzip7ReferenceTokenHelper.getAccountBalance(tezosServerUrl, mapId, publicKeyHash);
        }
        catch (e) {
            return resolve({ "status": false, "data": 0, "key": "getUteBalance" });
        }
        return resolve({ "status": true, "data": (balance * 1.0) / 1000000.00, "key": "getUteBalance" });
    })
}

/**
 * This returns the XTZ balance for the user
 */
export const getTezosBalance = async (publicKeyHash) => {
    let balance = 0;
    try {
        balance = await TezosNodeReader.getSpendableBalanceForAccount(tezosServerUrl, publicKeyHash);
        return { "status": true, "data": (balance / 1000000.00), "key": "getTezosBalance" }
    }
    catch (e) {
        return { "status": false, "data": 0, "key": "getTezosBalance" }
    }
}

/**
 * Fetches transactions for a given user
 */

export async function getTokenTransactions(tokenAddress, managerAddress) {
    const { url, apiKey, network } = conseilServerConfig;

    let direct = ConseilQueryBuilder.blankQuery();
    direct = ConseilQueryBuilder.addFields(
        direct,
        'timestamp',
        'block_level',
        'source',
        'destination',
        'amount',
        'kind',
        'fee',
        'status',
        'operation_group_hash',
        'parameters'
    );
    direct = ConseilQueryBuilder.addPredicate(direct, 'kind', ConseilOperator.EQ, ['transaction'], false);
    direct = ConseilQueryBuilder.addPredicate(direct, 'status', ConseilOperator.EQ, ['applied'], false);
    direct = ConseilQueryBuilder.addPredicate(direct, 'destination', ConseilOperator.EQ, [tokenAddress], false);
    direct = ConseilQueryBuilder.addPredicate(direct, 'source', ConseilOperator.EQ, [managerAddress], false);
    direct = ConseilQueryBuilder.addOrdering(direct, 'timestamp', ConseilSortDirection.DESC);
    direct = ConseilQueryBuilder.setLimit(direct, 1_000);

    let indirect = ConseilQueryBuilder.blankQuery();
    indirect = ConseilQueryBuilder.addFields(
        indirect,
        'timestamp',
        'block_level',
        'source',
        'destination',
        'amount',
        'kind',
        'fee',
        'status',
        'operation_group_hash',
        'parameters'
    );
    indirect = ConseilQueryBuilder.addPredicate(indirect, 'kind', ConseilOperator.EQ, ['transaction'], false);
    indirect = ConseilQueryBuilder.addPredicate(indirect, 'status', ConseilOperator.EQ, ['applied'], false);
    indirect = ConseilQueryBuilder.addPredicate(indirect, 'destination', ConseilOperator.EQ, [tokenAddress], false);
    indirect = ConseilQueryBuilder.addPredicate(indirect, 'parameters', ConseilOperator.LIKE, [managerAddress], false);
    indirect = ConseilQueryBuilder.addOrdering(indirect, 'timestamp', ConseilOperator.DESC);
    indirect = ConseilQueryBuilder.setLimit(indirect, 1_000);

    return Promise.all([direct, indirect].map(q => TezosConseilClient.getOperations({ url: url, apiKey, network }, network, q)))
        .then(responses =>
            responses.reduce((result, r) => {
                r.forEach(rr => result.push(rr));
                return result;
            })
        )
        .then(transactions => {
            return transactions.sort((a, b) => a.timestamp - b.timestamp);
        });
}

export async function getTransactions(userAddress) {
    let newTransactions = (await getTokenTransactions(uteContractAddress, userAddress).catch((e) => {
        console.log('-debug: Error in: getSyncAccount -> getTokenTransactions for:' + userAddress);
        console.error(e);
        return { "status": true, "data": [], "key": "getTransactions" }
    })).filter((obj, pos, arr) => arr.map((o) => o.operation_group_hash).indexOf(obj.operation_group_hash) === pos);

    const addressPattern = '([1-9A-Za-z^OIl]{36})';

    const transferPattern = new RegExp(`Left[(]Left[(]Left[(]Pair"${addressPattern}"[(]Pair"${addressPattern}"([0-9]+)[))))]`);

    newTransactions = newTransactions.map(transaction => {
        const params = transaction.parameters.replace(/\s/g, '');
        if (transferPattern.test(params)) {
            try {
                const parts = params.match(transferPattern);

                return {
                    ...transaction,
                    status: transaction.status !== 'applied' ? 'FAILED' : 'READY',
                    amount: Number(parts[3] / 1000000),
                    source: parts[1],
                    destination: parts[2],
                    direction: parts[1] === userAddress ? 'OUTGOING' : (parts[2] === userAddress ? 'INCOMING' : 'UNKNOWN')
                };
            } catch (e) {
                console.log(e);
            }
        }
    });
    return { "status": true, "data": newTransactions, "key": "getTransactions" }
}

/**
 * Transfers UTE from one wallet to another
 */

export function clearRPCOperationGroupHash(hash) {
    return hash.replace(/\"/g, '').replace(/\n/, '');
}

var attempts = 0;
export async function transferInitialXtz(tezosServerUrl, conseilServerInfo, keyStore, toAddress, attempts, fee) {
    try {
        const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'));
        const xtzOpResult = await TezosNodeWriter.sendTransactionOperation(tezosServerUrl, signer, keyStore, toAddress, TEZOS_INITIAL_BALANCE, fee);
        const xtzResult = await TezosConseilClient.awaitOperationConfirmation(conseilServerInfo, conseilServerInfo.network, clearRPCOperationGroupHash(xtzOpResult.operationGroupID), 11, conseilServerInfo.network === 'mainnet' ? 61 : 31); // 61 for mainnet
        if (xtzResult['status'] === 'applied')
            return true
        else
            throw new Error('Operation was not successful');
    }
    catch (e) {
        if (attempts - 1 == 0)
            return false;
        else
            return await transferInitialXtz(tezosServerUrl, conseilServerInfo, keyStore, toAddress, attempts - 1, fee);
    }
}

export async function transferUte(payload) {
    const { keyStore, toAddress, amount, isTestingCenterUser } = payload;
    const { fee, gas, freight, networkWait } = conseilServerConfig.network === 'mainnet' ? { fee: FEE_MAINNET, gas: GAS_MAINNET, freight: FREIGHT_MAINNET, networkWait: NETWORKTIME_MAINNET } : { fee: FEE_TESTNET, gas: GAS_TESTNET, freight: FREIGHT_TESTNET, networkWait: NETWORKTIME_TESTNET };
    try {
        const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'));
        const uteOpId = await Tzip7ReferenceTokenHelper.transferBalance(tezosServerUrl, signer, keyStore, uteContractAddress, fee, keyStore.publicKeyHash, toAddress, amount * 1000000, gas, freight);
        const uteResult = await TezosConseilClient.awaitOperationConfirmation(conseilServerConfig, conseilServerConfig.network, clearRPCOperationGroupHash(uteOpId), 11, networkWait);
        if (uteResult['status'] === 'applied') {
            if (isTestingCenterUser) {
                attempts = 2
                return { "status": true, "data": await transferInitialXtz(tezosServerUrl, conseilServerConfig, keyStore, toAddress, 2, fee), "key": "transferUte" };
            }
        }
        return { "status": true, "data": true, "key": "transferUte" };
    }
    catch (e) {
        return { "status": false, "data": e, "key": "transferUte" };
    }
    return { "status": false, "data": false, "key": "transferUte" };
}
