import { ProductMedia } from './../../../models/product-media';
import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from '../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['../product-creation.component.css', './media-upload.component.css']
})
export class MediaUploadComponent extends ProductCreationComponent implements OnInit, OnChanges {

  constructor(public request: RequestService,  public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "mediaUpload";
    this.stepNb = 3;
    this.stepName = "Téléchargez au moins 3 photos.";
    this.formData.path.previous = "announcement-title";
    this.formData.path.next = "activity-domain";
    this.isMandatory = false;
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  public getFile(): void {
    let files = document.getElementById('product-pictures').files;

    this.addMedia(files[0]);
  }

  public addMedia(file: any): void {
    this.product.productMedias.push(new ProductMedia(0, file.name, file.name));
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
}
