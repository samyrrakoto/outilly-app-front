import { Observable } from 'rxjs';
import { FormValidatorService } from './../../../services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../services/form-data.service';
import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent extends ProductCreationComponent implements OnInit, OnChanges {
  myControl = new FormControl();
  options: Array<string>;
  filteredOptions: Observable<Array<string>>;

  constructor(public request: RequestService, public formData: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.errorMessages;
    this.formData.fieldName = "productBrand";
    this.stepNb = 5;
    this.stepName = "Quelle est la marque de votre produit ?";
    this.formData.path.previous = "activity-domain";
    this.formData.path.next = "product-category";
    this.placeholder = "(ex :  Facom)";
    this.options = ['Facom', 'Milwaukee', 'Casto'];
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.product.brands.push(new Brand());
  }

  ngOnChanges(): void {}

  ngDoCheck() {
    if (this.myControl.valueChanges) {
      this.formData.product.brands[0].name = this.myControl.value;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
