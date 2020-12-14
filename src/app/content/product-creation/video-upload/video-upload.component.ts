import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { ProductMedia } from 'src/app/models/product-media';
import { Modals } from 'src/app/models/modals';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';
import { HttpEventType } from '@angular/common/http';
import { media } from 'src/app/parameters';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['../product-creation.component.css', './video-upload.component.css']
})
export class VideoUploadComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly maxUploadVideos: number = media.MAX_UPLOAD_VIDEOS;
  readonly videoFormatAccepted: string = media.VIDEO_FORMAT_ACCEPTED;
  product: Product;
  isLoading: boolean;
  uploaded: boolean = false;
  currentMedia: ProductMedia;
  modals: Modals;
  percentDone: number;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(productOnboarding);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "videoUpload";
    this.stepNb = 15;
    this.stepName = "Augmentez vos chances de vendre votre produit, prenez-le en vidéo !";
    this.stepSubtitle = "Pas de vidéo ? Passez à l'étape suivante.";
    this.path.previous = this.formData.product.isWarrantied.toString() === 'true' ? "warranty-duration" : 'is-warrantied';
    this.path.next = "reserve-price";
    this.isLoading = false;
    this.currentMedia = new ProductMedia();
    this.modals = new Modals();
    this.modals.addModal('video-preview');
  }

  ngOnInit(): void {
  }

  public handleFile(): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('product-video')).files;

    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        this.getFormData(files[i])
          .then((formData) => this.sendMedia(formData))
          .then(() => {
            setTimeout(() => {}, 500);
          });
      }
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
    document.getElementById("product-video").click();
  }

  private sendMedia(data: FormData): Promise<void> {
    return new Promise((resolve) => {
      this.isLoading = true;
      this.request.uploadMedia(data).subscribe(
        (media: any) => {
          if (media.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * media.loaded / media.total);
          }
          if (media.type === HttpEventType.Response) {
            this.isLoading = false;
            this.uploaded = true;
            this.addMedia(media.body);
            resolve()
          }
        }
      );
    });
  }

  private addMedia(media: any): void {
    this.product.productMedias.push(new ProductMedia(media.id, media.type, media.path, media.link, media.isHosted));
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
        this.uploaded = false;
      }
    )
  }

  public pauseVideo(videoId: string): void {
    const video: any = document.getElementById(videoId);

    if (video !== null) {
      video.pause();
    }
  }

  public getNbUploadedVideo(): number {
    let nbUploadedVideos: number = 0;

    for (const media of this.product.productMedias) {
      if (media.type === 'video') {
        nbUploadedVideos++;
      }
    }
    return nbUploadedVideos;
  }
}
