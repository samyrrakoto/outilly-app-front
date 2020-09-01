import { HttpHeaders } from '@angular/common/http';
import { ProductMedia } from './../../../models/product-media';
import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from '../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['../product-creation.component.css', './media-upload.component.css']
})
export class MediaUploadComponent extends ProductCreationComponent implements OnInit, OnChanges {
  httpOptions: any = {
    headers: new HttpHeaders({'Content-Type': 'multipart/form-data'}),
    observe: 'response' as 'response'
  };

  constructor(public request: RequestService,  public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "mediaUpload";
    this.stepNb = 3;
    this.stepName = "Téléchargez au moins 3 photos. (.jpg, .png uniquement)";
    this.formData.path.previous = "announcement-title";
    this.formData.path.next = "activity-domain";
    this.isMandatory = false;
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  public handleFile(): void {
    const files = (<HTMLInputElement>document.getElementById('product-pictures')).files;
    const formData: FormData = new FormData();

    formData.append('productId', localStorage.getItem('id'));
    formData.append('productStrId', localStorage.getItem('strId'));
    formData.append('mediaFile', files.item(0), files.item(0).name);

    this.addMedia(files.item(0));
    // this.displayPreview(files[0]);
    this.sendMedia(formData);
  }

  public openImgPicker(): void {
    const fileElem = document.getElementById("product-pictures");

    fileElem.click();
  }

  public addMedia(file: any): void {
    this.product.productMedias.push(new ProductMedia(0, file.name, 'image'));
  }

  public sendMedia(data: any): void {
    const response = this.request.postData(data, this.request.uri.MEDIA_PRODUCT);

    response.subscribe((res) => {
      console.log(res);
    });
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

  public displayPreview(file: any): void {
    const img: any = document.createElement("img");
    const medias: any = document.getElementById("displayed-medias");
    const reader = new FileReader();

    img.classList.add("obj", "previews");
    img.file = file;
    medias.appendChild(img);

    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}
