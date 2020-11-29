import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { ProductMedia } from 'src/app/models/product-media';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['../product-creation.component.css', './video-upload.component.css']
})
export class VideoUploadComponent extends ProductCreationComponent implements OnInit {

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "videoUpload";
    this.stepNb = 16;
    this.stepName = "Augmentez vos chances de vendre votre produit, prenez-le en vidéo !";
    this.formData.path.previous = this.formData.product.isWarrantied.toString() === 'true' ? "warranty-duration" : 'is-warrantied';
    this.formData.path.next = "announce-kind";
  }

  ngOnInit(): void {}

  public getFile(): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('product-video')).files;
    const formData: FormData = this.getFormData(files);

    this.addMedia(files[0]);
    this.sendMedia(formData);
  }

  private getFormData(files: FileList): FormData {
    const formData: FormData = new FormData();

    formData.append('productId', localStorage.getItem('id'));
    formData.append('productStrId', localStorage.getItem('strId'));
    formData.append('mediaFile', files.item(0), files.item(0).name);

    return formData;
  }

  public openImgPicker(): void {
    document.getElementById("product-video").click();
  }

  private sendMedia(data: any): void {
    this.request.uploadMedia(data).subscribe(
      (video: any) => {
        this.addMedia(video);
      }
    );
  }

  private addMedia(media: any): void {
    this.product.productMedias.push(new ProductMedia(media.id, media.type, media.path, media.link, media.isHosted));
  }
}
