import { store } from "../components/Provider";
import { IKeyStore } from "../models";
import { setKeyStoreAction } from "../store/actions";
import { IKeyStoreState } from "../store/states";
import { getItem, setItem } from "../helpers/storage";
import { getUteBalance, getTransactions, getTezosBalance } from "../helpers"
class SessionService {
  private sessionTokenKey: string = "KeyStore";

  public get token(): IKeyStore | null {
    return JSON.parse(getItem(this.sessionTokenKey));
  }

  public get isSessionActive(): boolean {
    // store.dispatch(
    //   setKeyStoreAction(JSON.parse(getItem(this.sessionTokenKey)))
    // );
    return !!this.token;
  }

  public signOut(): void {}

  private setSession(response: IKeyStore): IKeyStoreState {
    if (response === undefined || response === null) {
      return null;
    }
    setItem(this.sessionTokenKey, response);
    store.dispatch(setKeyStoreAction(response));

    return response;
  }

  public async getUTEBalanceFromStorage() {
    if(!this.token) return null;

     const balance = await getUteBalance(this.token.publicKeyHash);
     return balance;
  }

  public async getXTZBalanceFromStorage() {
    if(!this.token) return null;

     const balance = await getTezosBalance(this.token.publicKeyHash);
     return balance;
  }

  public async getTransactionHistoryFromStorage() {
    if(!this.token) return null;

     const transaction = await getTransactions(this.token.publicKeyHash);
     return transaction;
  }
}

export default new SessionService();
