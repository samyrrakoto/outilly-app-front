import { KycSide, KycType } from 'src/app/models/kyc-doc';
import { BankDoc } from 'src/app/models/bank-doc';
import { KycRequestService } from 'src/app/services/kyc-request.service';
import { Injectable } from '@angular/core';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { KycDoc } from 'src/app/models/kyc-doc';
import { ErrorMessage, ErrorMessageManagerService, ErrorMessageTemplate } from 'src/app/services/error-message-manager.service';
import { Modals } from 'src/app/models/modals';
import { HttpStatus } from 'src/app/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class KycManagerService {
  kycDocs: KycDoc[] = [];
  currentKycDoc: KycDoc = new KycDoc();
  bankDoc: BankDoc = new BankDoc();

  constructor(
    private userManager: UserManagerService,
    private kycRequest: KycRequestService,
    public errorManager: ErrorMessageManagerService
  ) { }

  /* 1. KYC doc creation */
  public async createKycDoc(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.createKycDoc().subscribe({
        next: (res: any) => {
          console.log("Create KYC doc");
          console.log(res);
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
  private async storeKycDoc(page: KycSide, file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.storeKycDoc(page, file).subscribe({
        next: (res: any) => {
          console.log("Store KYC doc");
          console.log(res);
          this.currentKycDoc.id = res.body.id;
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
  private async addPage(event: any, loading: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.kycRequest.addPage(this.currentKycDoc.id).subscribe({
        next: (res: any) => {
          console.log("Add doc");
          console.log(res);
          if (res.body.result) {
            this.currentKycDoc.page === KycSide.RECTO ? this.currentKycDoc.hasRecto = true : this.currentKycDoc.hasVerso = true;
            this.onSelectFile(event);
            loading = false;
            resolve();
          }
          else {
            this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
            loading = false;
            reject();
          }
        },
        error: () => {
          this.errorManager.addErrorMessage(ErrorMessage.SIMPLE);
          loading = false;
          reject();
        }
      });
    });
  }

  private onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        console.log(event.target.result);
        // this.kycDocs.push(<string>event.target.result);
      }
    }
  }

  public async handleFile(event: any, loading: boolean): Promise<void> {
    const files: FileList = (<HTMLInputElement>document.getElementById('kyc')).files;

    if (files.length !== 0) {
      loading = true;
      await this.createKycDoc();
      await this.storeKycDoc(this.currentKycDoc.page, files[0]);
      await this.addPage(event, loading);
    }
  }

  public async askKycValidation(modals: Modals): Promise<void> {
    this.kycRequest.askKycValidation().subscribe({
      next: () => {
        this.userManager.user.mangoPayData.KYCstatus = AskValidationStatus.VALIDATION_ASKED;
        modals.close('kyc');
        return;
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

  public hasBankInfo(): boolean {
    return this.bankDoc.iban !== '';
  }

  public hasMangoPayData(): boolean {
    return this.userManager.user.mangoPayData !== null;
  }

  public hasKyc(): boolean {

    return this.userManager.user.mangoPayData !== null && this.userManager.user.mangoPayData.KYCdocs.length > 0;
  }

  public setVerso(): void {
    this.currentKycDoc.hasVerso = true;
  }

  public setRecto(): void {
    this.currentKycDoc.hasRecto = true;
  }

  public setId(): void {
    this.currentKycDoc.type = KycType.ID_CARD;
  }

  public setPassport(): void {
    this.currentKycDoc.type = KycType.PASSPORT;
  }

  public getKycDisplay(): boolean {
    const KYCstatus: AskValidationStatus = this.userManager.user.mangoPayData.KYCstatus;

    return KYCstatus === null || KYCstatus === AskValidationStatus.REFUSED;
  }

  public isKycCreated(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.CREATED;
  }

  public isKycAsked(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.VALIDATION_ASKED;
  }

  public isKycRefused(): boolean {
    return this.userManager.user.mangoPayData.KYCstatus === AskValidationStatus.REFUSED;
  }

  public isKycComplete(): boolean {
    if (this.currentKycDoc.type === 'id-card') {
      return this.currentKycDoc.hasRecto && this.currentKycDoc.hasVerso;
    }
    else if (this.currentKycDoc.type === 'passport') {
      return this.currentKycDoc.hasRecto;
    }
  }
}

export enum AskValidationStatus {
  CREATED = 'CREATED',
  VALIDATION_ASKED = 'VALIDATION_ASKED',
  REFUSED = 'REFUSED',
  SUCCEEDED = 'SUCCEEDED'
}
