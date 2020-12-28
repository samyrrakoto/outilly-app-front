import { KycDoc } from './kyc-doc';
export class MangoPayData {
  id: number = 0;
  mangoPayId: number = 0;
  walletId: number = 0;
  ibanId: number = 0;
  KYCDocs: KycDoc[] = [];
}
