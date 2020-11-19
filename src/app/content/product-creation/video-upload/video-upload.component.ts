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
      () => {},
      () => {
        this.errorMessages.push('Une erreur lors de l\'upload est survenue');
      }
      );
  }

  private addMedia(file: File): void {
    if (!this.isMediaPresent(file.name)) {
      this.product.productMedias.push(new ProductMedia(file, 'video'));
    }
  }

  public removeMedia(fileName: string): void {
    let i: number = 0;

    for (const media of this.product.productMedias) {
      if (media.file.name === fileName) {
        this.product.productMedias.splice(i, 1);
      }
      i++;
    }
  }

  private isMediaPresent(fileName: string): boolean {
    for (const media of this.product.productMedias) {
      if (media.file.name === fileName) {
        return true;
      }
    }
    return false;
  }
}
