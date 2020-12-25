import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['../product-creation.component.css', './product-description.component.css']
})
export class ProductDescriptionComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  product: Product;
  readonly maxLength: number = 650;
  readonly minLength: number = 20;
  form: FormGroup;

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
    this.formData.fieldName = "productDescription";
    this.stepNb = 9;
    this.stepName = "Apportez des précisions à votre annonce";
    this.stepSubtitle = "Expliquez avec le plus de détails possibles ce que vous vendez pour éviter les mauvaises surprises. N'oubliez pas que l'acheteur compte sur ces détails pour se décider à acheter !";
    this.path.current = "product-description";
    this.path.previous = "product-state";
    this.path.next = "product-zipcode";
    this.placeholder = "";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const description: HTMLElement = document.getElementById('description');

    if (description !== null) {
      description.focus();
    }
  }

  public removeAllSpaces(str: string): string {
    str = str.trim();

    while (str.indexOf(' ') !== -1) {
      str = str.replace(' ', '');
    }
    return str;
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      description: [this.product.description, [Validators.required, this.tooShort(), this.tooLong()]],
    });
  }

  private tooShort(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const value: string = this.removeUselessSpaces(control.value);
        const longEnough: boolean = this.removeAllSpaces(value).length >= this.minLength;
        const verifications: boolean = longEnough;

        return verifications ? null : {tooShort: control.value};
      }
  }

  private tooLong(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const value: string = this.removeUselessSpaces(control.value);
        const notTooLong: boolean = this.removeAllSpaces(value).length <= this.maxLength;
        const verifications: boolean = notTooLong;

        return verifications ? null : {tooLong: control.value};
      }
  }

  private removeUselessSpaces(str: string): string {
    str = str.trim();

    return str;
  }

  public get controls() {
    return this.form.controls;
  }
}
