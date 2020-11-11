import { Observable } from 'rxjs';
import { FormValidatorService } from './../../../services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../services/form-data.service';
import { RequestService } from './../../../services/request.service';
import { ProductCreationComponent } from './../product-creation.component';
import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['../product-creation.component.css', './product-brand.component.css']
})
export class ProductBrandComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("matOption") matOption: ElementRef;
  myControl = new FormControl();
  brands: Array<string>;
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
    this.placeholder = "Commencez à écrire le nom d'une marque et sélectionnez-la";
    this.brands = [];
  }

  ngOnInit(): void {
    this.getBrands()
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
    const filterValue = value.toLowerCase();

    return this.brands.filter(brands => brands.toLowerCase().includes(filterValue)).sort();
  }

  private getBrands(): Promise<any> {
    return new Promise((resolve) => {
      const response = this.request.getData(this.request.uri.BRANDS);

      response.subscribe((res) => {
        for (const elem of res) {
          this.brands.push(elem.name);
        }
        resolve();
      });
    });
  }

  public addBrand(): void {
    if (!this.hasType() && this.isBrandExist()) {
      const brandId: number = this.getId();
      this.product.brands.push(new Brand(brandId, this.myControl.value));
    }
    this.filterTreatment();
  }

  public removeBrand(brandName: string): void {
    let i: number = 0;

    for (const brand of this.product.brands) {
      if (brandName === brand.name) {
        this.product.brands.splice(i, 1);
      }
      i++;
    }
    this.filterTreatment();
  }

  private hasType(): boolean {
    for (const brand of this.product.brands) {
      if (brand.name === this.myControl.value) {
        return true;
      }
    }
    return false;
  }

  private isBrandExist(): boolean {
    for (const brand of this.brands) {
      if (this.myControl.value === brand) {
        return true;
      }
    }
    return false;
  }

  private getId(): number {
    let i: number = 0;

    for (const brand of this.brands) {
      if (this.myControl.value === brand) {
        return i + 1;
      }
      i++;
    }
    return -1;
  }

  test() {
    console.log("test");
  }
}
