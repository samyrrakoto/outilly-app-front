import { Viewport, ViewportService } from 'src/app/services/viewport.service';
import { prices } from 'src/app/parameters';
import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reserve-price',
  templateUrl: './reserve-price.component.html',
  styleUrls: ['../product-creation.component.css', './reserve-price.component.css']
})
export class ReservePriceComponent extends StepForm implements OnInit {
  @ViewChild('reservePrice') reservePrice: ElementRef;
  readonly root: string ='product/create/';
  readonly maxProductPrice: number = prices.MAX_PRODUCT_PRICE;
  product: Product;
  form: FormGroup;

  constructor(
    public formData: FormDataService,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder,
    private viewport: ViewportService)
  {
    super(productOnboarding, 'reserve-price');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "reservePrice";
    this.stepName = "Quel est votre prix (en €) ?";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    if (!this.viewport.check(Viewport.MOBILE) && this.reservePrice) {
      this.reservePrice.nativeElement.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      reservePrice: [this.product.reservePrice, [Validators.required, Validators.min(0), Validators.max(this.maxProductPrice / 100), this.isNotEmpty()]],
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
