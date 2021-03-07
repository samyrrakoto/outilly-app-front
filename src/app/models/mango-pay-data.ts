import { AskValidationStatus } from 'src/app/services/kyc-manager.service';
import { KycDoc } from './kyc-doc';

export class MangoPayData {
  id: number = 0;
  mangoPayId: number = 0;
  walletId: number = 0;
  ibanId: number = null;
  KYCdocs: KycDoc[] = [];
  KYCstatus: AskValidationStatus = null;
}
