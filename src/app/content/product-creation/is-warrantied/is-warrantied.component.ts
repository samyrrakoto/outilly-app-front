import { Product } from 'src/app/models/product';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';
import { productOnboarding } from 'src/app/onboardings';

@Component({
  selector: 'app-is-warrantied',
  templateUrl: './is-warrantied.component.html',
  styleUrls: ['../product-creation.component.css', './is-warrantied.component.css']
})
export class IsWarrantiedComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  additionalControls: boolean;
  product: Product;

  constructor(
    public formData: FormDataService,
    public formValidatorService: FormValidatorService)
  {
    super(productOnboarding, 'is-warrantied');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.additionalControls = this.product.isWarrantied !== null ? true : false;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "isWarrantied";
    this.stepName = "Appliquez-vous une garantie ?";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.product.isWarrantied !== null) {
      this.product.isWarrantied === true ? this.setFocus('yes') : this.setFocus('no');
    }
    this.handleWarranty();
  }

  public handleWarranty(): void {
    this.path.next = this.product.isWarrantied ? 'warranty-duration' : 'video-upload';
  }

  public setFocus(id: string): void {
    const tiles = ['yes', 'no'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
