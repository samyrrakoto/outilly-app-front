import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ProductMedia } from 'src/app/models/product-media';
import { StepForm } from 'src/app/models/step-form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { media } from 'src/app/parameters';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['../product-creation.component.css', './media-upload.component.css']
})
export class MediaUploadComponent extends StepForm {
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly minNbPictures: number = media.MIN_UPLOAD_PICTURES;
  readonly maxNbPictures: number = media.MAX_UPLOAD_PICTURES;
  readonly picturesFormatAccepted: string = media.PICTURES_FORMAT_ACCEPTED;
  readonly root: string = 'product/create/';
  uploaded: boolean = false;
  percentDone: number = 0;
  form: FormGroup;
  product: Product;
  isLoading: boolean;
  currentMedia: ProductMedia;
  additionalControls: boolean = false;

  constructor(
    private request: RequestService,
    public formData: FormDataService,
    public formValidatorService: FormValidatorService,
    public http: HttpClient,
    public formBuilder: FormBuilder)
  {
    super(productOnboarding, 'media-upload');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "mediaUpload";
    this.stepName = "Téléchargez vos photos";
    this.stepSubtitle = "Vous pouvez télécharger jusqu'à " + this.maxNbPictures + " photos ! (.jpeg, .jpg, .png)";
    this.isMandatory = false;
    this.isLoading = false;
    this.currentMedia = new ProductMedia();
    this.modals.addModal('picture-preview');
  }

  ngOnInit(): void {
    this.additionalControls = this.checkAdditionalControls();
  }

  private checkAdditionalControls(): boolean {
    if (this.product.productMedias.length >= this.minNbPictures && this.product.productMedias.length <= this.maxNbPictures) {
      return true;
    }
    else {
      return false;
    }
  }

  public handleFile(): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('product-pictures')).files;
    const nbFiles: number = files.length;

    if (nbFiles !== 0) {
      this.sendMedia(files, 0, nbFiles);
    }
  }

  private getFormData(file: File): FormData {
      const formData: FormData = new FormData();

      formData.append('mediaFile', file);
      formData.append('productId', localStorage.getItem('id'));
      formData.append('productStrId', localStorage.getItem('strId'));
      formData.append('mediaType', 'image');
      console.log(this.request.getFormDataPayload(formData));
      return formData;
  }

  public openImgPicker(): void {
    document.getElementById("product-pictures").click();
  }

  private addMedia(media: any): void {
    this.product.productMedias.push(new ProductMedia(media.id, media.type, media.path, media.link, media.isHosted));
    this.additionalControls = this.checkAdditionalControls();
  }

  private sendMedia(files: FileList, index: number, nbFiles: number): void {
    const data: FormData = this.getFormData(files[index]);

    this.request.uploadMedia(data).subscribe(
      (media: any) => {
        this.isLoading = true;

        if (media.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * media.loaded / media.total);
        }
        if (media.type === HttpEventType.Response) {
          console.log(media);
          this.isLoading = false;
          this.uploaded = true;
          this.addMedia(media.body);
          this.percentDone = 0;
          if (index + 1 < nbFiles && index + 1 < this.maxNbPictures) {
            this.sendMedia(files, index + 1, nbFiles);
          }
        }
      }
    );
  }

  private removeMedia(currentMedia: ProductMedia): void {
    let i: number = 0;

    for (const media of this.product.productMedias) {
      if (currentMedia.path === media.path) {
        this.product.productMedias.splice(i, 1);
        this.additionalControls = this.checkAdditionalControls();
        return;
      }
      i++;
    }
  }

  public cancelMedia(media: ProductMedia): void {
    const productId: string = localStorage.getItem('id');
    const productStrId: string = localStorage.getItem('strId');

    this.request.deleteData(this.request.uri.DELETE_MEDIA, null, [productId, productStrId, media.id.toString()]).subscribe(
      (res: any) => {
        if (res.deleted) {
          this.removeMedia(media);
        }
      }
    )
  }
}
