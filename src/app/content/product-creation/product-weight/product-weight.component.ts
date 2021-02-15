import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-product-weight',
  templateUrl: './product-weight.component.html',
  styleUrls: ['../product-creation.component.css', './product-weight.component.css']
})
export class ProductWeightComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  maxValue: string = '30';
  form: FormGroup;
  product: Product;

  constructor(
    public formData: FormDataService,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super(productOnboarding, 'product-weight');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productWeight";
    this.stepName = "Pour la livraison, combien pèse votre colis emballé (en kg) ?";
    this.placeholder = '10';
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const weight: HTMLElement = document.getElementById('weight');

    if (weight !== null) {
      weight.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      weight: [this.product.weight, [Validators.min(0), Validators.max(30)]],
    });
  }

  private isNotEmpty(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value !== 0 ? null : {isEmpty: control.value}
    ;
  }

  public get controls() {
    return this.form.controls;
  }
}
