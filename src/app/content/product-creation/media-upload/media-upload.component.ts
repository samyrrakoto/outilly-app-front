import { HttpHeaders, HttpClient } from '@angular/common/http';
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

  constructor(public request: RequestService,  public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService, public http: HttpClient) {
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
    const files: FileList = (<HTMLInputElement>document.getElementById('product-pictures')).files;
    const formData: FormData = new FormData();

    formData.append('productId', localStorage.getItem('id'));
    formData.append('productStrId', localStorage.getItem('strId'));
    formData.append('mediaFile', files.item(0), files.item(0).name);

    this.addMedia(files);
    this.sendMedia(formData);
    this.displayPreview(files[0]);
  }

  public openImgPicker(): void {
    const fileElem = document.getElementById("product-pictures");

    fileElem.click();
  }

  private addMedia(file: FileList): void {
    this.product.productMedias.push(new ProductMedia(0, file[0].name, 'image'));
  }

  private sendMedia(data: FormData): void {
    const response = this.request.uploadMedia(data);

    response.subscribe((res) => {
      console.log(res);
    });
  }

  public removeMedia(mediaPath: string): void {
    let i: number = 0;
    const nav: any = document.getElementById(mediaPath);

    for (const media of this.product.productMedias) {
      if (media.path === mediaPath) {
        this.product.productMedias.splice(i, 1);
      }
      i++;
    }
    nav.remove();
  }

  private displayPreview(file: any): void {
    const div: HTMLElement = document.getElementById("displayed-medias")
    const nav: HTMLElement = document.createElement("nav");
    const leftLevel: HTMLElement = document.createElement("div");
    const rightLevel: HTMLElement = document.createElement("div");
    const img: any = document.createElement("img");
    const btn: HTMLElement = document.createElement("button");
    const reader: FileReader = new FileReader();

    img.classList.add("previews");
    img.file = file;
    img.style.width = "250px";
    img.style.margin = "auto";
    img.style.border = "solid 3px var(--KTKP-GREEN)";

    leftLevel.appendChild(img);
    leftLevel.classList.add("level-left");

    btn.classList.add("button", "has-background-black", "has-text-white");
    btn.innerHTML = "x";
    btn.addEventListener('click', () => this.removeMedia(img.file.name));
    rightLevel.appendChild(btn);
    rightLevel.classList.add("level-right");

    nav.appendChild(leftLevel);
    nav.appendChild(rightLevel);
    nav.classList.add("level", "new-element");
    nav.id = img.file.name;

    div.appendChild(nav);

    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}
