import { ErrorMessageManagerService } from 'src/app/services/error-message-manager.service';
import { RequestService } from 'src/app/services/request.service';
import { Modals } from 'src/app/models/modals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  modals: Modals = new Modals();
  kycCreated: boolean = false;
  kycType: string = '';
  docId: number = 0;
  kycSent: string[] = [];
  page: string = '';
  recto: boolean = false;
  verso: boolean = false;
  readonly tiles: string[] = ['id-card', 'passport'];
  readonly acceptedKycFormats: string[] = [];

  constructor(
    private request: RequestService,
    public errorMessages: ErrorMessageManagerService)
  {
    this.modals.addModal('id');
  }

  ngOnInit(): void {
  }

  public handleFile(): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('kyc')).files;

    if (files.length !== 0) {
      this.createKycDoc()
        .then(() => this.storeDoc(this.page, files[0]))
        .then(() => this.addPage());
    }
  }

  public openImgPicker(elementId: string): void {
    document.getElementById(elementId).click();
  }

  private createKycDoc(): Promise<void> {
    const payload: any = {
      type: 'IDENTITY_PROOF'
    };

    return new Promise((resolve, reject) => {
      this.request.postData(payload, this.request.uri.CREATE_KYC_DOC).subscribe(
        (res: any) => {
          resolve();
        },
        () => {
          this.errorMessages.addErrorMessage('Une erreur est survenue');
          reject();
        }
      )
    });
  }

  private storeDoc(page: string, file: File): Promise<void> {
    const formData: FormData = new FormData();
    formData.append('type', 'IDENTITY_PROOF');
    formData.append('page', page);
    formData.append('docFile', file);

    return new Promise((resolve, reject) => {
      this.request.storeKycDoc(formData).subscribe(
        (res: any) => {
          if (res.body) {
            this.docId = res.body.id;
          }
        },
        () => {
          this.errorMessages.addErrorMessage('Une erreur est survenue');
          reject();
        },
        () => {
          resolve();
        }
      )
    });
  }

  private addPage(): Promise<void> {
    const payload: any = {
      'docId': this.docId
    };

    return new Promise((resolve, reject) => {
      this.request.postData(payload, this.request.uri.ADD_KYC_PAGE).subscribe({
        next: (res: any) => {
          if (res.body.result) {
            this.kycSent.push(this.getKycName(this.kycType) + " [" + this.page + "]");
            resolve();
          }
          else {
            this.errorMessages.addErrorMessage('Une erreur est survenue');
            reject();
          }
        },
        error: () => {
          reject();
        }
      })
    });
  }

  public askKycValidation(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.KYC_VALIDATION_STATUS).subscribe({
        next: (res: any) => {
          if (res.status === 'CREATED') {
            this.kycCreated = true;
          }
          resolve();
        }
      })
    });
  }

  public setFocus(id: string): void {
    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of this.tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }

  public isKycComplete(): boolean {
    if (this.kycType === 'id-card') {
      return this.recto && this.verso;
    }
    else if (this.kycType === 'passport') {
      return this.recto;
    }
  }

  private getKycName(kycId: string): string {
    if (kycId === 'id-card') {
      return "carte d'identité";
    }
    else if (kycId === 'passport') {
      return "passeport";
    }
  }
}
