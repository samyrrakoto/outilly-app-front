import { UserManagerService } from 'src/app/services/user-manager.service';
import { ErrorMessageManagerService } from 'src/app/services/error-message-manager.service';
import { RequestService } from 'src/app/services/request.service';
import { Modals } from 'src/app/models/modals';
import { Component, OnInit } from '@angular/core';
import { AskValidationStatus } from 'src/app/models/uri';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  loading: boolean = false;
  modals: Modals = new Modals();
  kycUrl: string[] = [];
  kycStatus: string = '';
  kycSent: string[] = [];
  kycType: string = '';
  docId: number = 0;
  page: string = '';
  recto: boolean = false;
  verso: boolean = false;
  readonly tiles: string[] = ['id-card', 'passport'];
  readonly acceptedKycFormats: string[] = [];

  constructor(
    private request: RequestService,
    public errorMessages: ErrorMessageManagerService,
    public userManager: UserManagerService)
  {
    this.modals.addModal('id');
  }

  ngOnInit(): void {
  }

  public handleFile(event: any): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('kyc')).files;

    if (files.length !== 0) {
      this.loading = true;
      this.createKycDoc()
        .then(() => this.storeDoc(this.page, files[0]))
        .then(() => this.addPage(event));
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

  private addPage(event: any): Promise<void> {
    const payload: any = {
      'docId': this.docId
    };

    return new Promise((resolve, reject) => {
      this.request.postData(payload, this.request.uri.ADD_KYC_PAGE).subscribe({
        next: (res: any) => {
          if (res.body.result) {
            this.kycSent.push(this.getKycName(this.kycType) + " [" + this.page + "]");
            this.page === 'recto' ? this.recto = true : this.verso = true;
            this.onSelectFile(event);
            this.loading = false;
            resolve();
          }
          else {
            this.errorMessages.addErrorMessage('Une erreur est survenue');
            this.loading = false;
            reject();
          }
        },
        error: () => {
          this.errorMessages.addErrorMessage('Une erreur est survenue');
          this.loading = false;
          reject();
        }
      })
    });
  }

  public askKycValidation(): Promise<void> {
    return new Promise((resolve) => {
      this.request.postData(null, this.request.uri.ASK_KYC_VALIDATION).subscribe({
        next: (res: any) => {
          this.kycStatus = AskValidationStatus.VALIDATION_ASKED;
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

  public onSelectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.kycUrl.push(<string>event.target.result);
      }
    }
  }
}
