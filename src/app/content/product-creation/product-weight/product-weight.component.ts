import { productOnboarding } from './../../../onboardings';
import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title,
    public formBuilder: FormBuilder)
  {
    super(productOnboarding);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productWeight";
    this.stepNb = 12;
    this.stepName = "Combien pèse votre colis emballé (en kg) ?";
    this.path.previous = "product-delivery";
    this.path.current = 'product-weight';
    this.path.next = "is-warrantied";
    this.placeholder = '10';
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('weight').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      weight: [this.product.weight, [Validators.required, Validators.min(0), Validators.max(30), this.isNotEmpty()]],
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
