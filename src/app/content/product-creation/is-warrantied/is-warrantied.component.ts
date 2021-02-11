import { Product } from 'src/app/models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-is-warrantied',
  templateUrl: './is-warrantied.component.html',
  styleUrls: ['../product-creation.component.css', './is-warrantied.component.css']
})
export class IsWarrantiedComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  additionalControls: boolean;
  product: Product;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super();
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.additionalControls = this.product.isWarrantied !== null ? true : false;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "isWarrantied";
    this.stepNb = 13;
    this.stepName = "Appliquez-vous une garantie ?";
    this.path.previous = 'product-weight';
    this.path.next = 'warranty-duration';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.product.isWarrantied !== null) {
      this.product.isWarrantied === true ? this.setFocus('yes') : this.setFocus('no');
    }
    this.handleWarranty();
  }

  public handleWarranty(): void {
    this.path.next = this.product.isWarrantied ? 'warranty-duration' : 'video-upload';
    this.path.previous = this.product.toDeliver ? 'product-weight' : 'product-delivery';
  }

  public setFocus(id: string): void {
    const tiles = ['yes', 'no'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
