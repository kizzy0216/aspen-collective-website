import { TezosNodeReader, TezosNodeWriter, TezosConseilClient, TezosMessageUtils, KeyStore, Tzip7ReferenceTokenHelper, OperationResult } from 'conseiljs';
import { ConseilQueryBuilder, ConseilOperator, ConseilSortDirection, ConseilServerInfo } from 'conseiljs';
import { KeyStoreUtils, SoftSigner } from 'conseiljs-softsigner';
import { registerFetch, registerLogger } from 'conseiljs';
import fetch from 'node-fetch';
import * as log from 'loglevel';


// Initialize Conseil JS
const logger = log.getLogger('conseiljs');
logger.setLevel('info', false);
registerLogger(logger);
registerFetch(fetch);


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

//TODO: Add an throwable expection

/**
 * Returns the UTE balance
 * @param tezosServerUrl The HTTP URL for the tezos node. 
 * @param uteContractAddress The UTE smart contract address. 
 * @param keyStore The KeyStore object representing the user's wallet
 */
export async function getUteBalance(tezosServerUrl: string, uteContractAddress: string, keyStore: KeyStore): Promise<number | undefined> {
    const storage = await Tzip7ReferenceTokenHelper.getSimpleStorage(tezosServerUrl, uteContractAddress);
    const mapId = storage.mapid;
    let balance = 0.00;
    try {
        balance = await Tzip7ReferenceTokenHelper.getAccountBalance(tezosServerUrl, mapId, keyStore.publicKeyHash);
    }
    catch (e) {
        logger.error('Unable to fetch UTE balance', e);
        return undefined;
    }
    return (balance * 1.0) / 1000000.00;
}


/**
 * Fetches the tezos balance for the user 
 * @param tezosServerUrl The HTTP URL for the tezos node.  
 * @param keyStore The KeyStore object representing the user's wallet
 */
export async function getTezosBalance(tezosServerUrl: string, keyStore: KeyStore): Promise<number | undefined> {
    let balance = 0;
    try {
        balance = await TezosNodeReader.getSpendableBalanceForAccount(tezosServerUrl, keyStore.publicKeyHash);
    }
    catch (e) {
        logger.error('Unable to return xtz balance', e);
        return undefined;
    }
    return balance;
}


function clearRPCOperationGroupHash(hash: string) {
    return hash.replace(/\"/g, '').replace(/\n/, '');
}

/**
 * Transfers UTE from one wallet to another
 * @param tezosServerUrl The HTTP URL for the tezos node.  
 * @param keyStore The KeyStore object representing the user's wallet 
 * @param uteContractAddress The UTE smart contract address. 
 * @param toAddress The recipient's tezos address
 * @param amount The amount to transfer e.g 1, 2.55 etc
 * @param isTestingCenterUser If set to true, the function will transfer 1 XTZ in addition to UTE specified 
 */
export async function transferUte(tezosServerUrl: string, conseilServerInfo: ConseilServerInfo, keyStore: KeyStore, uteContractAddress: string, toAddress: string, amount: number, isTestingCenterUser: boolean = false): Promise<boolean> {
    const { fee, gas, freight, networkWait } = conseilServerInfo.network === 'mainnet' ? { fee: FEE_MAINNET, gas: GAS_MAINNET, freight: FREIGHT_MAINNET, networkWait: NETWORKTIME_MAINNET } : { fee: FEE_TESTNET, gas: GAS_TESTNET, freight: FREIGHT_TESTNET, networkWait: NETWORKTIME_TESTNET };
    try {
        const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'));
        const uteOpId = await Tzip7ReferenceTokenHelper.transferBalance(tezosServerUrl, signer, keyStore, uteContractAddress, fee, keyStore.publicKeyHash, toAddress, amount * 1000000, gas, freight);
        const uteResult = await TezosConseilClient.awaitOperationConfirmation(conseilServerInfo, conseilServerInfo.network, clearRPCOperationGroupHash(uteOpId), 11, networkWait);
        if (uteResult['status'] === 'applied') {
            if (isTestingCenterUser) {
                logger.info('Ute Transferred, initiating xtz transfer');
                return await transferInitialXtz(tezosServerUrl, conseilServerInfo, keyStore, toAddress, 2, fee);
            }
        }
        return true;
    }
    catch (e) {
        logger.error('Unable to transfer balance', e);
        return false;
    }
    return true;
}

async function transferInitialXtz(tezosServerUrl: string, conseilServerInfo: ConseilServerInfo, keyStore: KeyStore, toAddress: string, attempts: number = 2, fee: number = 27000): Promise<boolean> {
    try {
        const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'));
        const xtzOpResult: OperationResult = await TezosNodeWriter.sendTransactionOperation(tezosServerUrl, signer, keyStore, toAddress, TEZOS_INITIAL_BALANCE, fee);
        const xtzResult = await TezosConseilClient.awaitOperationConfirmation(conseilServerInfo, conseilServerInfo.network, clearRPCOperationGroupHash(xtzOpResult.operationGroupID), 11, conseilServerInfo.network === 'mainnet' ? 61 : 31); // 61 for mainnet
        if (xtzResult['status'] === 'applied')
            return true
        else
            throw new Error('Operation was not successful');
    }
    catch (e) {
        logger.error('Unable to transfer seed XTZ', e);
        if (attempts - 1 == 0)
            return false;
        else
            return await transferInitialXtz(tezosServerUrl, conseilServerInfo, keyStore, toAddress, attempts - 1, fee);
    }
}


/**
 * Generates a new wallet for the user. Should be only called on first start up.
 */
export async function getNewWallet(): Promise<KeyStore> {
    return await KeyStoreUtils.generateIdentity();
}


/**
 * Fetches transactions for a given user
 * @param uteContractAddress The UTE smart contract address
 * @param userAddress The user's address
 * @param conseilServerInfo Conseil Server information
 */
export async function syncTokenTransactions(uteContractAddress: string, userAddress: string, conseilServerInfo: ConseilServerInfo) {
    let newTransactions: any[] = (await getTokenTransactions(uteContractAddress, userAddress, conseilServerInfo).catch((e) => {
        console.log('-debug: Error in: getSyncAccount -> getTokenTransactions for:' + userAddress);
        console.error(e);
        return [];
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
                /* */
            }
        }
    });

    return newTransactions;
}

async function getTokenTransactions(tokenAddress: string, managerAddress: string, conseilServerInfo: ConseilServerInfo) {
    const { url, apiKey, network } = conseilServerInfo;

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
    indirect = ConseilQueryBuilder.addOrdering(indirect, 'timestamp', ConseilSortDirection.DESC);
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