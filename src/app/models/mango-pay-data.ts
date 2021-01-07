import { AskValidationStatus } from 'src/app/models/uri';
import { KycDoc } from './kyc-doc';
export class MangoPayData {
  id: number = 0;
  mangoPayId: number = 0;
  walletId: number = 0;
  ibanId: number = null;
  KYCdocs: KycDoc[] = [];
  KYCstatus: AskValidationStatus = null;
}
