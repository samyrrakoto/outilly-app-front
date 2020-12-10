import { Product } from './../../../models/product';
import { RequestService } from 'src/app/services/request.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['../product-creation.component.css', './account-request.component.css']
})
export class AccountRequestComponent extends StepForm implements OnInit {
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
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "accountRequest";
    this.stepNb = 19;
    this.stepName = "Avez-vous un compte sur Ekipr ?";
    this.path.previous = "reserve-price";
    this.path.next = "account-request";
  }

  ngOnInit(): void {}

  setFocus(id: string): void {
    const tiles = ['yes', 'no'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }

  private constructResponse(): string {
    const response = JSON.stringify(this.formData.product);

    return response;
  }
}
