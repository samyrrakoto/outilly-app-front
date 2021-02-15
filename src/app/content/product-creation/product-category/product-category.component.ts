import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Component, OnInit } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { RequestService } from 'src/app/services/request.service';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['../product-creation.component.css', './product-category.component.css']
})
export class ProductCategoryComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  product: Product;
  additionalControls: boolean;
  public categories: Array<any> = [];
  readonly maxCategories: number = 2;

  constructor(
    private request: RequestService,
    public formData: FormDataService,
    public formValidatorService: FormValidatorService)
  {
    super(productOnboarding, 'product-category');
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.additionalControls = this.product.productCategories.length !== 0;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productCategory";
    this.stepName = "Dans quelle catégorie se trouve votre produit ?";
    this.placeholder = "Commencez à écrire le nom d'une catégorie de produit et sélectionnez-la";
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewChecked(): void {
    for (const category of this.categories) {
      for (const chosenCategory of this.product.productCategories) {
        if (category.label === chosenCategory.label) {
          document.getElementById(category.label).classList.add('chosen-tile');
        }
      }
    }
  }

  private getCategories(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.CATEGORIES).subscribe(
        (categories: any) => {
          for (const category of categories) {
            if (category.label !== 'Atelier') {
              this.categories.push({'label': category.label, 'id': category.id});
            }
          }
          resolve();
        });
    });
  }

  public setFocus(category: any): void {
    this.product.productCategories = [category];

    if (document.getElementById(category.label).classList.contains('chosen-tile')) {
      document.getElementById(category.label).classList.remove('chosen-tile');
      this.nextOn = true;
    }
    else {
      document.getElementById(category.label).classList.add('chosen-tile');
      this.nextOn = true;

      if (this.product.productCategories.length > 0) {
        this.additionalControls = true;
      }
    }
  }
}
