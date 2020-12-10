import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-announce-kind',
  templateUrl: './announce-kind.component.html',
  styleUrls: ['../product-creation.component.css', './announce-kind.component.css']
})
export class AnnounceKindComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  product: Product;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super();
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "announceKind";
    this.stepNb = 16;
    this.stepName = "Comment souhaitez-vous vendre votre produit ?";
    this.path.previous = "video-upload";
    this.path.next = "reserve-price";
  }

  public setFocus(id: string): void {
    const tiles = ['classic', 'hybrid'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.product.buyingOption !== null) {
      document.getElementById(this.product.buyingOption).classList.add('chosen-tile');
    }
  }
}
