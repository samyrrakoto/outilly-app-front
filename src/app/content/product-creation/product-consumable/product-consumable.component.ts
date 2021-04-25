import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StepForm } from 'src/app/models/step-form';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-product-consumable',
  templateUrl: './product-consumable.component.html',
  styleUrls: ['../product-creation.component.css', './product-consumable.component.css']
})
export class ProductConsumableComponent extends StepForm {
  readonly tiles: string[] = ['yes', 'no'];
  readonly root: string = 'product/create/';
  additionalControls: boolean;
  form: FormGroup;
  product: Product;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(productOnboarding, 'product-consumable');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.additionalControls = this.product.isConsumable !== null;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productConsumable";
    this.stepName = "Que souhaitez-vous vendre ?";
  }

  ngAfterViewChecked(): void {
    if (this.product.isConsumable !== null) {
      const consumableId: string = this.product.isConsumable ? 'yes' : 'no';

      document.getElementById(consumableId).classList.add('chosen-tile');
    }
  }

  public setFocus(id: string): void {
    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of this.tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
