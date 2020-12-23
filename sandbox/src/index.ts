import { ConseilServerInfo, KeyStore } from 'conseiljs';
import * as UteApi from './api';

// These are hard coded configs that are specified at build time. Two sets of configs are required, one for production/mainnet, the other for dev/testnet.
const tezosServerUrl = 'https://tezos-dev.cryptonomic-infra.tech:443';
const conseilServerConfig = { url: 'https://conseil-dev.cryptonomic-infra.tech:443', apiKey: 'hooman', network: 'delphinet' } as ConseilServerInfo;
const uteContractAddress = 'KT1TVMrbibvGTxHZ7ttCDFAx3XGoh2zp2iDQ';



// This is an example the user's wallet and should be stored securely on the mobile device.
// This is the first user's wallet
const user1KeyStore = {
    publicKey: 'edpkuDzi51ZB5xps6A2TsCBBLMc9ng3iF3dFnUCMYVh7wvd4fVDReK',
    secretKey: 'edskRzvg2AKvUm44huDm6YZHfUBwLYHKxuvnV29NUYUw81rm4Ep9udBf4FzECB9Mqriasf29Xo5xBFHyJG1UfwJrgYUzwmxwfJ',
    publicKeyHash: 'tz1gwPkwSvBbiEGnRbnGMaqWedSDksFnKhU1',
    curve: 0,
    storeType: 0,
    seed: 'account require woman vehicle sketch hole hurdle brown ski season flock scorpion network next pair pyramid ice twenty where sell volcano lady peanut trust',
    derivationPath: undefined
} as KeyStore;


// This is the second user's wallet
const user2KeyStore = {
    publicKey: 'edpktfBCjFkrECcfWCRCbhiSAPC6qKSF3amA75gSGy79GTiZVmLyRf',
    secretKey: 'edskS4jzC1qCXy1pqeYMT9SeX5iere8mmA8TXyFinWGKSLedkeC3egxL7obKbToUu7hHYtTYan2DYEdHN29KuzGP5TaA6u6abL',
    publicKeyHash: 'tz1hB6th1opZ5sr1bAbzK7g3Ym6UvvEVHv7G',
    curve: 0,
    storeType: 0,
    seed: 'warm group hunt trigger office bitter venue stadium quarter dentist pink zero lock balcony clerk surge liar level woman differ rescue useless ladder shine',
    derivationPath: undefined
} as KeyStore;

// Examples begin

/**
 * This creates a wallet. The KeyStore object should be saved on device securely.
 * The wallet should be created only once, during the first startup after a fresh install.
 */
async function exampleCreateWallet() {
    const keyStore = await UteApi.getNewWallet();
    console.log('Wallet Object = ', keyStore);
}


/**
 * This returns the UTE token balance for the user
 */
async function exampleGetUteBalance() {
    const uteBalance = await UteApi.getUteBalance(tezosServerUrl, uteContractAddress, user1KeyStore);
    console.log('User UTE balance is = ', uteBalance);
}

/**
 * This returns the XTZ balance for the user
 */
async function exampleGetXtzBalance() {
    const xtzBalance = await UteApi.getTezosBalance(tezosServerUrl, user1KeyStore);
    console.log('User Tezos balance is = ', xtzBalance);
}

async function _debugPrintBalances(k: KeyStore) {
    const xtzBalance = await UteApi.getTezosBalance(tezosServerUrl, k);
    const uteBalance = await UteApi.getUteBalance(tezosServerUrl, uteContractAddress, k);
    console.log(`${uteBalance} UTE, ${xtzBalance} XTZ`);
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function exampleTransferUte() {
    // Print balance before
    console.log('Balances before transfer');
    console.log('User1');
    await _debugPrintBalances(user1KeyStore);
    console.log('User2')
    await _debugPrintBalances(user2KeyStore);


    const isTestingCenterFlag = false;       // Set via toggle button on settings page, part of persistent config. The default should be `false`

    //Perform the transfer of 1 UTE
    const result = await UteApi.transferUte(tezosServerUrl, conseilServerConfig, user1KeyStore, uteContractAddress, user2KeyStore.publicKeyHash, 1, isTestingCenterFlag);
    if (result) {
        console.log(`Transferred balance of  1 UTE from ${user1KeyStore.publicKeyHash} to ${user2KeyStore.publicKeyHash}`);

        // Print new balances
        console.log('Balances after transfer');
        console.log('User1');
        await _debugPrintBalances(user1KeyStore);
        console.log('User2')
        await _debugPrintBalances(user2KeyStore);
    }
    else
        console.log('Error transferring UTE');
}


async function exampleFetchTransactions() {
    const results = await UteApi.syncTokenTransactions(uteContractAddress, user1KeyStore.publicKeyHash, conseilServerConfig);
    console.log(results);
}



async function run() {
    console.log('Starting demo application');
    console.log('Example #1 - Create a wallet');
    await exampleCreateWallet();

    console.log('Example #2 - Get Balances');
    await exampleGetUteBalance();
    await exampleGetXtzBalance();

    console.log('Example #3 - Transfer UTE');
    await exampleTransferUte();

    console.log('Example #4 - Fetch transactions');
    await exampleFetchTransactions();

}

run();

