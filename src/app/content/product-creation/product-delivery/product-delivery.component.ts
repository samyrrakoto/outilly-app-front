import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delivery',
  templateUrl: './product-delivery.component.html',
  styleUrls: ['../product-creation.component.css', './product-delivery.component.css']
})
export class ProductDeliveryComponent extends ProductCreationComponent implements OnInit {

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "productDelivery";
    this.stepNb = 11;
    this.stepName = "Acceptez-vous de faire livrer votre produit ?";
    this.formData.path.previous = "product-zipcode";
    this.formData.path.next = "product-weight";
  }

  ngOnInit(): void {}

  handleDelivery(): void {
    this.formData.path.next = this.product.todeliver ? 'product-weight' : 'delivery-price-information';
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