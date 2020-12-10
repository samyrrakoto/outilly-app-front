import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    super();
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productDescription";
    this.stepNb = 9;
    this.stepName = "Description de votre annonce";
    this.stepSubtitle = "Expliquez avec le plus de détails possibles ce que vous vendez. N'oubliez pas que l'acheteur compte sur ces détails pour motiver son achat !";
    this.path.current = "product-description";
    this.path.previous = "product-state";
    this.path.next = "product-zipcode";
    this.placeholder = "Tondeuse en parfait état de marche...";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('description').focus();
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
      description: [this.product.description, [Validators.required, this.validDescription()]],
    });
  }

  private validDescription(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const value: string = this.removeUselessSpaces(control.value);
        const longEnough: boolean = this.removeAllSpaces(value).length >= 20;
        const verifications: boolean = longEnough;

        return verifications ? null : {notValid: control.value};
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
