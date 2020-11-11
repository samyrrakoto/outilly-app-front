import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category';
import { FormDataService } from 'src/app/services/form-data.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['../product-creation.component.css', './product-category.component.css']
})
export class ProductCategoryComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("matOption") matOption: ElementRef;
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
    this.placeholder = "Commencez à écrire le nom d'une catégorie de produit et sélectionnez-la";
    this.categories = [];
    this.matOption = null;
  }

  ngOnInit(): void {
    this.getCategories()
      .then(() => this.filterTreatment());
  }

  ngAfterViewInit(): void {
    if (this.matOption) {
      this.matOption.nativeElement.openPanel();
    }
  }

  private filterTreatment(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();

    return this.categories.filter(categorie => categorie.toLowerCase().includes(filterValue)).sort();
  }

  private getCategories(): Promise<any> {
    return new Promise((resolve) => {
      const response: any = this.request.getData(this.request.uri.CATEGORIES);

      response.subscribe((categories: any) => {
        for (const category of categories) {
          this.categories.push(category.label);
        }
        resolve();
      });
    });
  }

  public addCategory(): void {
    if (!this.hasCategory() && this.isCategoryExist()) {
      const categoryId: number = this.getId();

      this.product.productCategories.push(new ProductCategory(categoryId, this.myControl.value));
    }
    this.filterTreatment();
  }

  public removeCategory(categoryName: string): void {
    let i: number = 0;

    for (const category of this.product.productCategories) {
      if (categoryName === category.label) {
        this.product.productCategories.splice(i, 1);
      }
      i++;
    }
  }

  private hasCategory(): boolean {
    for (const category of this.product.productCategories) {
      if (category.label === this.myControl.value) {
        return true;
      }
    }
    return false;
  }

  private isCategoryExist(): boolean {
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
