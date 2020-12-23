import { IKeyStore } from '../../models'

export enum KeyStoreTypeKeys {
    SET_KEY_STORE = 'SET_KEY_STORE',
}

export interface ISetKeyStoreAction {
    type: typeof KeyStoreTypeKeys.SET_KEY_STORE
    payload: IKeyStore
}

export type KeyStoreActionTypes = ISetKeyStoreAction