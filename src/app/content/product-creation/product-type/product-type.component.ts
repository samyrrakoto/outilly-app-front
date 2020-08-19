import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../services/form-data.service';
import { RequestService } from './../../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/product-type';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['../product-creation.component.css', './product-type.component.css']
})
export class ProductTypeComponent extends ProductCreationComponent implements OnInit {

  myControl = new FormControl();
  types: Array<string>;
  filteredOptions: Observable<Array<string>>;

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "productType";
    this.stepNb = 7;
    this.stepName = "Quel est le type du produit que vous vendez ?";
    this.formData.path.previous = "product-category";
    this.formData.path.next = "product-state";
    this.placeholder = "Commencez à écrire le nom d'un type de produit et sélectionnez-la";
    this.types = [];
  }

  ngOnInit(): void {
    this.getTypes();
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

    return this.types.filter(type => type.toLowerCase().includes(filterValue));
  }

  getTypes(): void {
    const response = this.request.getData(this.request.uri.TYPES);

    response.subscribe((res) => {
      for (const elem of res) {
        this.types.push(elem.label);
      }
    });
  }

  addType(): void {
    if (!this.hasType() && this.isTypeExist()) {
      const typeId: number = this.getId();

      this.product.productTypes.push(new ProductType(typeId, this.myControl.value));
    }
    this.myControl.setValue('');
  }

  removeType(typeLabel: string): void {
    let i: number = 0;

    for (const productType of this.product.productTypes) {
      if (typeLabel === productType.label) {
        this.product.productTypes.splice(i, 1);
      }
      i++;
    }
  }

  hasType(): boolean {
    for (const productType of this.product.productTypes) {
      if (productType.label === this.myControl.value) {
        return true;
      }
    }
    return false;
  }

  isTypeExist(): boolean {
    for (const type of this.types) {
      if (this.myControl.value === type) {
        return true;
      }
    }
    return false;
  }

  getId(): number {
    let i: number = 0;

    for (const type of this.types) {
      if (this.myControl.value === type) {
        return i + 1;
      }
      i++;
    }
    return -1;
  }
}
