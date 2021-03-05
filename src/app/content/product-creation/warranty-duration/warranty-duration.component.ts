import { Viewport, ViewportService } from 'src/app/services/viewport.service';
import { productOnboarding } from 'src/app/onboardings';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['../product-creation.component.css', './warranty-duration.component.css']
})
export class WarrantyDurationComponent extends StepForm implements OnInit {
  @ViewChild('warrantyDuration') warrantyDuration: ElementRef;
  readonly root: string ='product/create/';
  product: Product;
  form: FormGroup;

  constructor(
    public formData: FormDataService,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder,
    private viewport: ViewportService)
  {
    super(productOnboarding, 'warranty-duration');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "warrantyDuration";
    this.stepName = "Pendant combien de mois ?";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    if (!this.viewport.check(Viewport.MOBILE) && this.warrantyDuration) {
      this.warrantyDuration.nativeElement.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      warrantyDuration: [this.product.warrantyDuration, [Validators.required, Validators.min(0), Validators.max(30), this.isNotEmpty()]],
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
