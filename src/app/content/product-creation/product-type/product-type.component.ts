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
  options: Array<string>;
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
    this.placeholder = "(ex :  Perceuse)";
    this.options = ['Perceuse', 'Perforateur- Burineur', 'Visseuse et tournevis électrique', 'Carotteuse'];
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.product.productTypes.push(new ProductType());
  }

  ngOnChanges(): void {}

  ngDoCheck() {
    if (this.myControl.valueChanges) {
      this.product.productTypes[0].label = this.myControl.value;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
