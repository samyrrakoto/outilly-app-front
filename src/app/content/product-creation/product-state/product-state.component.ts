import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';
import { staticStates } from 'src/app/parameters';

@Component({
  selector: 'app-product-state',
  templateUrl: './product-state.component.html',
  styleUrls: ['../product-creation.component.css', './product-state.component.css']
})
export class ProductStateComponent extends StepForm {
  readonly root: string = 'product/create/';
  additionalControls: boolean;
  product: Product;
  currentState: string;
  stateDescription: boolean = false;
  staticStates: string[] = staticStates;

  constructor(
    public formData: FormDataService,
    public formValidatorService: FormValidatorService)
  {
    super(productOnboarding, 'product-state');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.additionalControls = this.product.quality !== '' ? true : false;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productState";
    this.stepName = "Dans quel état se trouve le produit ?";
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
