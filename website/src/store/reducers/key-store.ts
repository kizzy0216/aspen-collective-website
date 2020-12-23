import { IKeyStoreState } from '../states'
import { KeyStoreTypeKeys, KeyStoreActionTypes } from '../types'

const initialState: IKeyStoreState = null

export default (state: IKeyStoreState = initialState, action: KeyStoreActionTypes): IKeyStoreState => {
  switch (action.type) {
    case KeyStoreTypeKeys.SET_KEY_STORE:
      return action.payload
    default:
      return state
  }
}
