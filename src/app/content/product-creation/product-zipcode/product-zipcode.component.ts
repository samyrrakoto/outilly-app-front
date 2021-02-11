import { productOnboarding } from './../../../onboardings';
import { Product } from 'src/app/models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-product-zipcode',
  templateUrl: './product-zipcode.component.html',
  styleUrls: ['../product-creation.component.css', './product-zipcode.component.css']
})
export class ProductZipcodeComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  product: Product;
  form: FormGroup;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title,
    public formBuilder: FormBuilder,
    public regexTemplate: RegexTemplateService)
  {
    super(productOnboarding);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productZipcode";
    this.stepNb = 10;
    this.stepName = "Où récupérer votre produit ?";
    this.stepSubtitle = "Là où l'acheteur devra se rendre pour le récupérer en mains propres."
    this.path.current = "product-zipcode";
    this.path.previous = "product-description";
    this.path.next = "product-weight";
    this.placeholder = "93500";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const zipcode: HTMLElement = document.getElementById('zipcode');

    if (zipcode !== null) {
      zipcode.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      zipcode: [this.product.locality, [Validators.required, Validators.pattern(this.regexTemplate.ZIPCODE)]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
