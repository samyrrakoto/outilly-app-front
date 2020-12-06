import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['../product-creation.component.css', './account-request.component.css']
})
export class AccountRequestComponent extends ProductCreationComponent implements OnInit {

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(request, formData, router, formValidatorService, title);
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "accountRequest";
    this.stepNb = 19;
    this.stepName = "Avez-vous un compte sur Ekipr ?";
    this.formData.path.previous = "reserve-price";
    this.formData.path.next = "account-request";
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
