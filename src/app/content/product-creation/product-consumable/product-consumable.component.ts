import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StepForm } from 'src/app/models/step-form';
import { AuthService } from 'src/app/services/auth.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { RequestService } from 'src/app/services/request.service';
import { ProductCreationComponent } from '../product-creation.component';

@Component({
  selector: 'app-product-consumable',
  templateUrl: './product-consumable.component.html',
  styleUrls: ['../product-creation.component.css', './product-consumable.component.css']
})
export class ProductConsumableComponent extends StepForm implements OnInit {
  readonly tiles: string[] = ['yes', 'no'];
  readonly root: string = 'product/create/';
  form: FormGroup;
  product: Product;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    private auth: AuthService,
    public title: Title)
  {
    super();
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productConsumable";
    this.stepNb = 3;
    this.stepName = "Votre produit est-il un consommable ?";
    this.stepSubtitle = 'Par consommable nous entendons un produit dont l\'utilisation est unique, contrairement à un outil';
    this.path.current = "product-consumable";
    this.path.previous = "media-upload";
    this.path.next = "product-category";
    this.placeholder = "(ex : jeanmarc78@aol.fr )";
  }

  ngAfterViewChecked(): void {
    if (this.product.isConsumable !== null) {
      const consumableId: string = this.product.isConsumable ? 'yes' : 'no';

      document.getElementById(consumableId).classList.add('chosen-tile');
    }
  }

  public setFocus(id: string): void {
    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of this.tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }
}
