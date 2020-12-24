import { pageInfo } from 'src/app/parameters';
import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ProductMedia } from 'src/app/models/product-media';
import { Modals } from 'src/app/models/modals';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { media } from 'src/app/parameters';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['../product-creation.component.css', './media-upload.component.css']
})
export class MediaUploadComponent extends StepForm implements OnInit, OnChanges {
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly maxNbPictures: number = media.MAX_UPLOAD_PICTURES;
  readonly picturesFormatAccepted: string = media.PICTURES_FORMAT_ACCEPTED;
  readonly root: string = 'product/create/';
  uploaded: boolean = false;
  percentDone: number = 0;
  form: FormGroup;
  product: Product;
  previews: Array<any>;
  isLoading: boolean;
  modals: Modals;
  currentMedia: ProductMedia;
  additionalControls: boolean = false;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public http: HttpClient,
    public title: Title,
    public formBuilder: FormBuilder)
  {
    super(productOnboarding);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "mediaUpload";
    this.stepNb = 2;
    this.stepName = "Téléchargez vos photos";
    this.stepSubtitle = "Sur " + pageInfo.BRAND_NAME + ", on n'est pas radin : c'est 3 photos minimum… et jusqu'à 10 ! (.jpeg, .jpg, .png)";
    this.path.current = "media-upload";
    this.path.previous = "announcement-title";
    this.path.next = "product-consumable";
    this.isMandatory = false;
    this.previews = [];
    this.isLoading = false;
    this.currentMedia = new ProductMedia();
    this.modals = new Modals();
    this.modals.addModal('picture-preview');
  }

  ngOnInit(): void {
    this.additionalControls = this.checkAdditionalControls();
  }

  private checkAdditionalControls(): boolean {
    if (this.product.productMedias.length >= 3 && this.product.productMedias.length <= 10) {
      return true;
    }
    else {
      return false;
    }
  }

  ngAfterViewInit(): void {}
  ngOnChanges(): void {}

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
