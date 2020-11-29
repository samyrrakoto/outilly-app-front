import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductCreationComponent } from '../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ProductMedia } from 'src/app/models/product-media';
import { Modals } from 'src/app/models/modals';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['../product-creation.component.css', './media-upload.component.css']
})
export class MediaUploadComponent extends ProductCreationComponent implements OnInit, OnChanges {
  previews: Array<any>;
  isLoading: boolean;
  modals: Modals;
  currentMedia: ProductMedia;
  readonly mediaBaseUri: string = environment.mediaBaseUri;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public http: HttpClient)
  {
    super(request, formData, router, formValidatorService);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "mediaUpload";
    this.stepNb = 2;
    this.stepName = "Téléchargez au moins 3 photos";
    this.stepSubtitle = '(.jpg, .png uniquement)';
    this.formData.path.current = "media-upload";
    this.formData.path.previous = "announcement-title";
    this.formData.path.next = "product-consumable";
    this.isMandatory = false;
    this.previews = [];
    this.isLoading = false;
    this.currentMedia = new ProductMedia();
    this.modals = new Modals();
    this.modals.addModal('picture-preview');
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnChanges(): void {}

  public handleFile(): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('product-pictures')).files;
    this.isLoading = true;

    for (let i = 0; i < files.length; i++) {
      this.getFormData(files[i])
        .then((formData) => this.sendMedia(formData))
        .then(() => { setTimeout(() => {}, 500) });
    }
  }

  private getFormData(file: File): Promise<FormData> {
    return new Promise((resolve) => {
      const formData: FormData = new FormData();

      formData.append('mediaFile', file);
      formData.append('productId', localStorage.getItem('id'));
      formData.append('productStrId', localStorage.getItem('strId'));
      formData.append('mediaType', 'image');
      resolve(formData);
    });
  }

  public openImgPicker(): void {
    document.getElementById("product-pictures").click();
  }

  private addMedia(media: any): void {
    this.product.productMedias.push(new ProductMedia(media.id, media.type, media.path, media.link, media.isHosted));
  }

  private sendMedia(data: FormData): Promise<any> {
    return new Promise((resolve) => {
      this.request.uploadMedia(data).subscribe(
        (media: any) => {
          this.isLoading = false;
          this.addMedia(media);
          resolve();
        }
      );
    });
  }

  private removeMedia(currentMedia: ProductMedia): void {
    let i: number = 0;

    for (const media of this.product.productMedias) {
      if (currentMedia.path === media.path) {
        this.product.productMedias.splice(i, 1);
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
