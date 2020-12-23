import { ISetKeyStoreAction, KeyStoreTypeKeys } from "../types";
import { IKeyStoreState } from "../states";

export function setKeyStoreAction(payload: IKeyStoreState): ISetKeyStoreAction {
  return { type: KeyStoreTypeKeys.SET_KEY_STORE, payload };
}
