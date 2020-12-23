export interface IKeyStore {
  publicKey: string;
  secretKey: string;
  publicKeyHash: string;
  curve: number;
  storeType: number;
  seed: string;
  derivationPath: any;
}
export type TKeyStore = IKeyStore | null;