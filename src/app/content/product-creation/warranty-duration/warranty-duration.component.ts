import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['../product-creation.component.css', './warranty-duration.component.css']
})
export class WarrantyDurationComponent extends StepForm implements OnInit {
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
    this.formData.fieldName = "warrantyDuration";
    this.stepNb = 15;
    this.stepName = "Combien de mois garantissez-vous le produit ?";
    this.path.previous = "is-warrantied";
    this.path.next = "video-upload";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('warrantyDuration').focus();
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
