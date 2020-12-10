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
  selector: 'app-reserve-price',
  templateUrl: './reserve-price.component.html',
  styleUrls: ['../product-creation.component.css', './reserve-price.component.css']
})
export class ReservePriceComponent extends StepForm implements OnInit {
  readonly root: string ='product/create/';
  product: Product;
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
    this.formData.fieldName = "reservePrice";
    this.stepNb = 16;
    this.stepName = "Quel est votre prix (en €) ?";
    this.path.previous = "video-upload";
    this.path.next = "announce-overview";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('reservePrice').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      reservePrice: [this.product.reservePrice, [Validators.required, Validators.min(0), Validators.max(1000), this.isNotEmpty()]],
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
