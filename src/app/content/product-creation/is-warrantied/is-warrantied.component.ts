import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-is-warrantied',
  templateUrl: './is-warrantied.component.html',
  styleUrls: ['../product-creation.component.css', './is-warrantied.component.css']
})
export class IsWarrantiedComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
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
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "isWarrantied";
    this.stepNb = 14;
    this.stepName = "Garantissez-vous ce produit ?";
    this.path.previous = 'delivery-price-information';
    this.path.next = 'warranty-duration';
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.product.isWarrantied !== null) {
      const warrantyId: string = this.product.isWarrantied ? 'yes' : 'no';

      document.getElementById(warrantyId).classList.add('chosen-tile');
    }
    this.handleWarranty();
  }

  public handleWarranty(): void {
    this.path.next = this.product.isWarrantied ? 'warranty-duration' : 'video-upload';
    this.path.previous = this.product.todeliver ? 'delivery-price-information' : 'product-delivery';
  }

  setFocus(id: string): void {
    const tiles = ['yes', 'no'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
