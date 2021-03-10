import { KycSide } from 'src/app/models/kyc-doc';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class KycRequestService {
  readonly typeName: string = 'IDENTITY_PROOF';

  constructor(
    private request: RequestService
  ) { }

  public createKycDoc(): Observable<any> {
    const payload: any = {
      type: this.typeName
    };

    return this.request.postData(payload, this.request.uri.CREATE_KYC_DOC);
  }

  public storeKycDoc(page: KycSide, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('type', this.typeName);
    formData.append('page', page);
    formData.append('docFile', file);

    return this.request.postData(formData, this.request.uri.STORE_KYC_DOC, [], {observe: 'response'});
  }

  public addPage(docId: number): Observable<any> {
    const payload: any = {
      'docId': docId
    };

    return this.request.postData(payload, this.request.uri.ADD_KYC_PAGE);
  }

  public askKycValidation(): Observable<any> {
    return this.request.postData(null, this.request.uri.ASK_KYC_VALIDATION);
  }

  public getBankInfo(): Observable<any> {
    return this.request.getData(this.request.uri.BANK_INFO);
  }

  public bankAccountRegister(iban: string, bic: string): Observable<any> {
    const payload: any = {
      "IBAN": iban,
      "BIC": bic
    };

    return this.request.postData(payload, this.request.uri.BANK_ACCOUNT_REGISTRATION);
  }
}
