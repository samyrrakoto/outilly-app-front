import { AskValidationStatus } from 'src/app/enums/ask-validation-status';
import { KycSide, KycType } from 'src/app/models/kyc-doc';
import { BankDoc } from 'src/app/models/bank-doc';
import { KycRequestService } from 'src/app/services/kyc-request.service';
import { Injectable } from '@angular/core';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { KycDoc } from 'src/app/models/kyc-doc';
import { ErrorMessage, ErrorMessageManagerService } from 'src/app/services/error-message-manager.service';
import { Modals } from 'src/app/models/modals';
import { HttpStatus } from 'src/app/services/request.service';
import { Loading } from 'src/app/models/loading';

@Injectable({
  providedIn: 'root'
})
export class KycManagerService {
  indexCounter: number = 1;
  kycDocs: KycDoc[] = [];
  bankDoc: BankDoc = new BankDoc();
  validationStatus: AskValidationStatus = null;

  constructor(
    private userManager: UserManagerService,
    private kycRequest: KycRequestService,
    public errorManager: ErrorMessageManagerService
  ) { }

  /*
  ** KYC PROCESS
  */

  public async publishKycDoc(index: number): Promise<void> {
    await this.createKycDoc();
    await this.storeKycDoc(this.kycDocs[index]);
    await this.addPage(this.kycDocs[index]);

    if (index !== this.kycDocs.length - 1) {
      await this.publishKycDoc(index + 1);
    }
  }

  /* 1. KYC doc creation */
  private async createKycDoc(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.createKycDoc().subscribe({
        next: (res: any) => {
          if (res.status === !HttpStatus.CREATED) {
            this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
            reject();
          }
          else {
            resolve();
          }
        },
        error: () => {
          this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
          reject();
        }
      });
    });
  }

  /* 2. KYC doc storage */
  private async storeKycDoc(kycDoc: KycDoc): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.storeKycDoc(kycDoc.page, kycDoc.file).subscribe({
        next: (res: any) => {
          kycDoc.id = res.body.id;
          resolve();
        },
        error: () => {
          this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
          reject();
        },
      });
    });
  }

  /* 3. KYC doc page add */
  private async addPage(kycDoc: KycDoc): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.addPage(kycDoc.id).subscribe({
        next: (res: any) => {
          if (res.body.result) {
            resolve();
          }
          else {
            this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
            reject();
          }
        },
        error: () => {
          this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
          reject();
        }
      });
    });
  }

  public removeKycDoc(kyc: KycDoc): void {
    for (let i = 0; i < this.kycDocs.length; i++) {
      if (this.kycDocs[i].id === kyc.id) {
        this.kycDocs.splice(i, 1);
      }
    }
  }

  private onSelectFile(event: any, kycDoc: KycDoc): void {
    if (event.target.files && event.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      kycDoc.file = event.target.files[0];

      reader.onload = (event: any) => {
        kycDoc.url = (<string>event.target.result);
      }
    }
  }

  public async handleFile(event: any, type: KycType, page: KycSide): Promise<void> {
    const files: FileList = (<HTMLInputElement>document.getElementById('kyc')).files;

    if (files.length !== 0) {
      const kycDoc: KycDoc = new KycDoc(type, page);

      kycDoc.id = this.indexCounter;
      this.indexCounter++;
      this.onSelectFile(event, kycDoc);
      this.kycDocs.push(kycDoc);
    }
  }

  public async askKycValidation(modals: Modals, loading: Loading): Promise<void> {
    loading.load();
    await this.publishKycDoc(0)
      .catch(() => loading.unload());
    this.kycRequest.askKycValidation().subscribe({
      next: (res: any) => {
        if (res.body.result) {
          this.userManager.user.mangoPayData.KYCstatus = AskValidationStatus.VALIDATION_ASKED;
          loading.unload();
          modals.close('kyc');
        }
        else {
          this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
          loading.unload();
        }
      }
    });
  }

  public async getBankInfo(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.getBankInfo().subscribe({
        next: (res: any) => {
          this.bankDoc.iban = res.IBAN;
          this.bankDoc.bic = res.BIC;
          resolve();
        },
        error: () => {
          reject();
        }
      });
    });
  }

  public bankAccountRegister(iban: string, bic: string, modals: Modals): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.bankAccountRegister(iban, bic).subscribe(
        (res: any) => {
          if (res.status === HttpStatus.OK) {
            this.bankDoc.iban = iban;
            this.bankDoc.bic = bic;
            this.bankDoc.isSent = true;
            modals.close('bank-account');
            resolve();
          }
          else {
            this.errorManager.addErrorMessage('Une erreur est survenue');
            reject();
          }
        },
        () => {
          this.errorManager.addErrorMessage('Une erreur est survenue');
          reject();
        }
      )
    });
  }

  /*
  ** User Data checks
  */

  public hasBankInfo(): boolean {
    return this.bankDoc.iban !== '';
  }

  public hasMangoPayData(): boolean {
    return this.userManager.user.mangoPayData !== null;
  }

  public hasKyc(): boolean {
    return this.kycDocs.length > 0;
  }

  public hasStarted(): boolean {
    return this.kycDocs.length > 0;
  }

  /*
  ** Display conditionners
  */

  public getIdDisplay(): boolean {
    return !this.hasKyc() || this.isKycId() || (this.isKycPassport() && !this.hasStarted());
  }

  public getPassportDisplay(): boolean {
    return !this.hasKyc() || this.isKycPassport() || (this.isKycId() && !this.hasStarted());
  }

  public getKycDisplay(): boolean {
    const KYCstatus: AskValidationStatus = this.userManager.user.mangoPayData.KYCstatus;

    return KYCstatus === null || KYCstatus === AskValidationStatus.REFUSED;
  }

  public getRectoDisplay(): boolean {
    return !this.hasKyc() || !this.hasRecto();
  }

  public getVersoDisplay(): boolean {
    return !this.hasKyc() || (!this.hasVerso() && this.isKycId());
  }

  public isKycId(): boolean {
    for (const kycDoc of this.kycDocs) {
      if (kycDoc.type === KycType.ID_CARD) {
        return true;
      }
    }
    return false;
  }

  public isKycPassport(): boolean {
    for (const kycDoc of this.kycDocs) {
      if (kycDoc.type === KycType.PASSPORT) {
        return true;
      }
    }
    return false;
  }

  public hasRecto(): boolean {
    for (const kycDoc of this.kycDocs) {
      if (kycDoc.page === KycSide.RECTO) {
        return true;
      }
    }
    return false;
  }

  public hasVerso(): boolean {
    for (const kycDoc of this.kycDocs) {
      if (kycDoc.page === KycSide.VERSO) {
        return true;
      }
    }
    return false;
  }

  /*
  ** KYC status getters
  */

  public isKycCreated(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.CREATED;
  }

  public isKycAsked(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.VALIDATION_ASKED;
  }

  public isKycRefused(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.REFUSED;
  }

  public isKycValidated(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.VALIDATED;
  }

  public isKycComplete(): boolean {
    if (this.isKycId()) {
      return this.hasRecto() && this.hasVerso();
    }
    else if (this.isKycPassport()) {
      return this.hasRecto();
    }
  }
}
