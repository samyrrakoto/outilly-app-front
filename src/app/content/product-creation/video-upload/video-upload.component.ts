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
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "videoUpload";
    this.stepNb = 16;
    this.stepName = "Augmentez vos chances de vendre votre produit, prenez-le en vidéo !";
    this.formData.path.previous = this.formData.product.isWarrantied.toString() === 'true' ? "warranty-duration" : 'is-warrantied';
    this.formData.path.next = "announce-kind";
  }

  public getFile(): void {
    let files = (<HTMLInputElement>document.getElementById('product-video')).files;

    this.addMedia(files[0]);
    this.sendMedia([{
      'id': localStorage.getItem('id'),
      'strId': localStorage.getItem('strId'),
      'file': files[0]
    }]);
  }

  public sendMedia(data: any): void {
    const response = this.request.postData(data, this.request.uri.MEDIA_PRODUCT);

    response.subscribe((res) => {
      console.log(res);
    });
  }

  public addMedia(file: any): void {
    this.product.productMedias.push(new ProductMedia(0, file.name, file.name, 'video'));
  }

  public removeMedia(mediaPath: string): void {
    let i: number = 0;

    for (const media of this.product.productMedias) {
      if (media.path === mediaPath) {
        this.product.productMedias.splice(i, 1);
      }
      i++;
    }
  }

  ngOnInit(): void {
  }

}
