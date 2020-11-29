import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-price-information',
  templateUrl: './delivery-price-information.component.html',
  styleUrls: ['./delivery-price-information.component.css']
})
export class DeliveryPriceInformationComponent extends ProductCreationComponent implements OnInit {

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "deliveryPriceInformation";
    this.stepNb = 13;
    this.stepName = "Avec notre partenaire Mondial Relay, votre colis coûtera 6.90€ à l'acheteur.";
    this.formData.path.current = "delivery-price-information";
    this.formData.path.previous = this.formData.product.todeliver.toString() === 'true' ? 'product-weight' : 'product-delivery';
    this.formData.path.next = "is-warrantied";
  }

  ngOnInit(): void {
  }

}
