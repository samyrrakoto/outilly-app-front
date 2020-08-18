import { ActivityDomain } from './../../../models/activity-domain';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../services/form-data.service';
import { RequestService } from './../../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['../product-creation.component.css', './product-category.component.css']
})
export class ProductCategoryComponent extends ProductCreationComponent implements OnInit {
  myControl = new FormControl();
  categories: Array<string>;
  filteredOptions: Observable<Array<string>>;

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "productCategory";
    this.stepNb = 6;
    this.stepName = "Dans quelle catégorie se trouve votre produit ?";
    this.formData.path.previous = "product-brand";
    this.formData.path.next = "product-type";
    this.placeholder = "(ex :  Outillage à main)";
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategories();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnChanges(): void {}

  ngDoCheck() {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(categorie => categorie.toLowerCase().includes(filterValue));
  }

  getCategories(): void {
    const response = this.request.getData(this.request.uri.CATEGORIES);

    response.subscribe((res) => {
      for (const elem of res) {
        this.categories.push(elem.label);
      }
    });
  }

  addCategory(): void {
    if (!this.hasCategory() && this.isCategoryExist()) {
      const categoryId: number = this.getId();

      this.product.productCategories.push(new ProductCategory(categoryId, this.myControl.value));
    }
  }

  removeCategory(categoryName: string): void {
    let i: number = 0;

    for (const category of this.product.productCategories) {
      if (categoryName === category.label) {
        this.product.productCategories.splice(i, 1);
      }
      i++;
    }
  }

  hasCategory(): boolean {
    for (const category of this.product.productCategories) {
      if (category.label === this.myControl.value) {
        return true;
      }
    }
    return false;
  }

  isCategoryExist(): boolean {
    for (const category of this.categories) {
      if (this.myControl.value === category) {
        return true;
      }
    }
    return false;
  }

  getId(): number {
    let i: number = 0;

    for (const category of this.categories) {
      if (this.myControl.value === category) {
        return i + 1;
      }
      i++;
    }
    return -1;
  }
}
