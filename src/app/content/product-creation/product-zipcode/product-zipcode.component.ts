import { Viewport, ViewportService } from 'src/app/services/viewport.service';
import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-product-zipcode',
  templateUrl: './product-zipcode.component.html',
  styleUrls: ['../product-creation.component.css', './product-zipcode.component.css']
})
export class ProductZipcodeComponent extends StepForm implements OnInit {
  @ViewChild('productZipcode') productZipcode: ElementRef;
  readonly root: string = 'product/create/';
  product: Product;
  form: FormGroup;

  constructor(
    public formData: FormDataService,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder,
    public regexTemplate: RegexTemplateService,
    private viewport: ViewportService)
  {
    super(productOnboarding, 'product-zipcode');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productZipcode";
    this.stepName = "Où récupérer votre produit ?";
    this.stepSubtitle = "Là où l'acheteur devra se rendre pour le récupérer en mains propres."
    this.placeholder = "93500";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    if (!this.viewport.check(Viewport.MOBILE) && this.productZipcode) {
      this.productZipcode.nativeElement.focus();
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
