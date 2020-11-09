import { HttpClient } from '@angular/common/http';
import { ProductCreationComponent } from '../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ProductMedia } from 'src/app/models/product-media';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['../product-creation.component.css', './media-upload.component.css']
})
export class MediaUploadComponent extends ProductCreationComponent implements OnInit, OnChanges {

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public http: HttpClient)
    {
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

  ngAfterViewInit(): void {
    if (this.product.productMedias.length > 0) {
      for (const media of this.formData.product.productMedias) {
        if (media.type === 'image') {
          this.displayPreview(media.file);
        }
      }
    }
  }

  ngOnChanges(): void {}

  public handleFile(): void {
    const files: FileList = (<HTMLInputElement>document.getElementById('product-pictures')).files;
    const formData: FormData = this.getFormData(files);

    this.addMedia(files[0]);
    this.sendMedia(formData);
    this.displayPreview(files[0]);
  }

  private getFormData(files: FileList): FormData {
    const formData: FormData = new FormData();

    formData.append('productId', localStorage.getItem('id'));
    formData.append('productStrId', localStorage.getItem('strId'));
    formData.append('mediaFile', files.item(0), files.item(0).name);

    return formData;
  }

  public openImgPicker(): void {
    document.getElementById("product-pictures").click();
  }

  private addMedia(file: File): void {
    this.product.productMedias.push(new ProductMedia(file));
  }

  private sendMedia(data: FormData): void {
    this.request.uploadMedia(data).subscribe(
      () => {}
    );
  }

  public removeMedia(fileName: string): void {
    let i: number = 0;
    const nav: any = document.getElementById(fileName);

    for (const media of this.product.productMedias) {
      if (media.file.name === fileName) {
        this.product.productMedias.splice(i, 1);
      }
      i++;
    }
    nav.remove();
  }

  private displayPreview(file: File): void {
    const reader: FileReader = new FileReader();
    const img: any = this.constructPreview(file);

    reader.onload = (e) => {
      img.src = e.target.result;
    }

    if (img.file) {
      reader.readAsDataURL(img.file);
    }
  }

  private constructPreview(file: any): any {
    const medias: HTMLElement = document.getElementById("displayed-medias");
    const img: any = this.constructImg(file);
    const levels: HTMLElement = this.constructLevels(img);

    medias.appendChild(levels);
    return(img);
  }

  private constructImg(file: any): any {
    const img: any = document.createElement("img");

    img.classList.add("previews");
    img.file = file;
    img.style.width = "250px";
    img.style.margin = "auto";
    img.style.border = "solid 3px var(--KTKP-GREEN)";
    return img;
  }

  private constructLevels(img: any): HTMLElement {
    const levels: HTMLElement = document.createElement("nav");
    const leftLevel: HTMLElement = document.createElement("div");
    const rightLevel: HTMLElement = document.createElement("div");
    const btn: HTMLElement = document.createElement("button");

    leftLevel.appendChild(img);
    leftLevel.classList.add("level-left");

    btn.classList.add("button", "has-background-black", "has-text-white");
    btn.innerHTML = "x";
    btn.addEventListener('click', () => this.removeMedia(img.file.name));
    rightLevel.appendChild(btn);
    rightLevel.classList.add("level-right");

    levels.appendChild(leftLevel);
    levels.appendChild(rightLevel);
    levels.classList.add("level", "new-element");
    levels.id = img.file.name;
    return levels;
  }
}
