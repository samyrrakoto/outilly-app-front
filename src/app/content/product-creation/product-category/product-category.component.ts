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
  options: Array<string>;
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
    this.options = ['Outillage électroportatif', 'Outillage à main', 'Outillage à main', 'Autre', 'Outillage hydraulique'];
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.product.productCategories.push(new ProductCategory());
  }

  ngOnChanges(): void {}

  ngDoCheck() {
    if (this.myControl.valueChanges) {
      this.product.productCategories[0].label = this.myControl.value;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
