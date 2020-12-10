import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-product-delivery',
  templateUrl: './product-delivery.component.html',
  styleUrls: ['../product-creation.component.css', './product-delivery.component.css']
})
export class ProductDeliveryComponent extends StepForm implements OnInit {
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
    this.formData.fieldName = "productDelivery";
    this.stepNb = 11;
    this.stepName = "Concernant la livraison...";
    this.path.current = "product-delivery";
    this.path.previous = "product-zipcode";
    this.path.next = "product-weight";
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.product.todeliver !== null) {
      this.product.todeliver === true ? this.setFocus('yes') : this.setFocus('no');
    }
    this.handleDelivery();
  }

  public handleDelivery(): void {
    this.path.next = this.product.todeliver ? 'product-weight' : 'is-warrantied';
  }

  public setFocus(id: string): void {
    const tiles: string[] = ['yes', 'no'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
