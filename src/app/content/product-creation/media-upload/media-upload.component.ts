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
  previews: Array<any>;

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
    this.previews = [];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.product.productMedias.length > 0) {
      for (const media of this.product.productMedias) {
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

    for (const media of this.product.productMedias) {
      if (media.file.name === fileName) {
        this.product.productMedias.splice(i, 1);
        this.previews.splice(i, 1);
      }
      i++;
    }
  }

  private displayPreview(file: File): void {
    const reader: FileReader = new FileReader();
    const img: any = this.constructPreview(file);

    reader.onload = (e) => {
      img.src = e.target.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  private constructPreview(file: any): any {
    const img: any = document.createElement('img');

    img.file = file;
    img.name = file.name;
    this.previews.push(img);

    return img;
  }
}
