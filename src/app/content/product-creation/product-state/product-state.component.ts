import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-state',
  templateUrl: './product-state.component.html',
  styleUrls: ['../product-creation.component.css', './product-state.component.css']
})
export class ProductStateComponent extends ProductCreationComponent {

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productState";
    this.stepNb = 8;
    this.stepName = "Dans quel état se trouve le produit ?";
    this.formData.path.previous = "product-reference";
    this.formData.path.next = "product-description";
    this.product.quality = '';
  }

  setFocus(id: string): void {
    const tiles: Array<string> = ['new', 'excellent', 'good', 'acceptable', 'forparts'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
