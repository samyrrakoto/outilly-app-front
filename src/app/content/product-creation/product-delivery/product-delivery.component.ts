import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-delivery',
  templateUrl: './product-delivery.component.html',
  styleUrls: ['../product-creation.component.css', './product-delivery.component.css']
})
export class ProductDeliveryComponent extends ProductCreationComponent implements OnInit {

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(request, formData, router, formValidatorService, title);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productDelivery";
    this.stepNb = 11;
    this.stepName = "Acceptez-vous de faire livrer votre produit ?";
    this.formData.path.current = "product-delivery";
    this.formData.path.previous = "product-zipcode";
    this.formData.path.next = "product-weight";
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.product.todeliver !== null) {
      const deliveryId: string = this.product.todeliver ? 'yes' : 'no';

      document.getElementById(deliveryId).classList.add('chosen-tile');
    }
    this.handleDelivery();
  }

  public handleDelivery(): void {
    this.formData.path.next = this.product.todeliver ? 'product-weight' : 'is-warrantied';
  }

  public setFocus(id: string): void {
    const tiles: string[] = ['yes', 'no'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
