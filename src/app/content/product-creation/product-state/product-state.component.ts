import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';
import { staticStates } from 'src/app/parameters';

@Component({
  selector: 'app-product-state',
  templateUrl: './product-state.component.html',
  styleUrls: ['../product-creation.component.css', './product-state.component.css']
})
export class ProductStateComponent extends StepForm {
  readonly root: string = 'product/create/';
  product: Product;
  currentState: string;
  stateDescription: boolean = false;
  staticStates: string[] = staticStates;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(productOnboarding);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productState";
    this.stepNb = 8;
    this.stepName = "Dans quel état se trouve le produit ?";
    this.path.current = "product-state";
    this.path.previous = "product-reference";
    this.path.next = "product-description";
  }

  ngAfterViewChecked(): void {
    const stateId: HTMLElement = document.getElementById(this.product.quality);

    if (stateId !== null) {
      stateId.classList.add('chosen-tile');
    }
  }

  public setFocus(id: string): void {
    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of this.staticStates) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
