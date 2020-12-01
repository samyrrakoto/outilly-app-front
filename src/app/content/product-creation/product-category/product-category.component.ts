import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';
import { FormDataService } from 'src/app/services/form-data.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['../product-creation.component.css', './product-category.component.css']
})
export class ProductCategoryComponent extends ProductCreationComponent implements OnInit {
  public categories: Array<any>;
  private chosenCategories: number;
  readonly maxCategories: number = 2;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService)
  {
    super(request, formData, router, formValidatorService);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productCategory";
    this.stepNb = 4;
    this.stepName = "Dans quelle catégorie se trouve votre produit ?";
    this.stepSubtitle = 'Vous pouvez choisir jusqu\'à 2 catégories';
    this.formData.path.current = "product-category";
    this.formData.path.previous = "product-consumable";
    this.formData.path.next = "product-brand";
    this.placeholder = "Commencez à écrire le nom d'une catégorie de produit et sélectionnez-la";
    this.categories = [];
    this.chosenCategories = 0;
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

  private getCategories(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.CATEGORIES).subscribe(
        (categories: any) => {
          for (const category of categories) {
            this.categories.push({'label': category.label, 'id': category.id});
          }
          resolve();
        });
    });
  }

  public setFocus(category: any): void {
      if (document.getElementById(category.label).classList.contains('chosen-tile')) {
        document.getElementById(category.label).classList.remove('chosen-tile');
        this.removeProductCategory(category.label);
      }
      else {
        if (this.chosenCategories < this.maxCategories && !this.hasCategory(category.label)) {
          document.getElementById(category.label).classList.add('chosen-tile');
          this.addProductCategory(category);
        }
      }
  }

  private addProductCategory(category: any): void {
    this.product.productCategories.push(new ProductCategory(category.label, category.id));
    this.chosenCategories++;
  }

  private removeProductCategory(category: string): void {
    const pos: number = this.findCategory(category);

    this.chosenCategories--;
    this.product.productCategories.splice(pos, 1);
  }

  private findCategory(category: string): number {
    let i: number = 0;

    for (const elem of this.product.productCategories) {
      if (elem.label === category) {
        return i;
      }
      i++;
    }
    return -1;
  }

  private hasCategory(currentCategory: string): boolean {
    for (const category of this.product.productCategories) {
      if (category.label === currentCategory) {
        return true;
      }
    }
    return false;
  }
}
