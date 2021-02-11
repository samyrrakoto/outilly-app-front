import { productOnboarding } from 'src/app/onboardings';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Brand } from 'src/app/models/brand';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['../product-creation.component.css', './product-brand.component.css']
})
export class ProductBrandComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  readonly maxBrands: number = 5;
  @ViewChild("matOption") matOption: ElementRef;
  product: Product;
  myControl = new FormControl();
  brands: Array<string>;
  filteredOptions: Observable<Array<string>>;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(productOnboarding);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productBrand";
    this.stepNb = 5;
    this.stepName = "Sélectionnez les marques de votre produit";
    this.path.current = "product-brand";
    this.path.previous = "product-category";
    this.path.next = "product-state";
    this.placeholder = "Commencez à écrire le nom d'une marque et sélectionnez-la";
    this.brands = [];
  }

  ngOnInit(): void {
    this.getBrands()
      .then(() => this.filterTreatment());
  }

  ngAfterViewInit(): void {
    const productBrand: HTMLElement = document.getElementById('product-brand');

    if (productBrand !== null) {
      if (this.matOption) {
        this.matOption.nativeElement.openPanel();
      }
      productBrand.focus();
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

  private getBrands(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.BRANDS).subscribe((res) => {
        for (const elem of res) {
          this.brands.push(elem.name);
        }
        resolve();
      });
    });
  }

  public addBrand(): void {
    if (!this.hasType() && this.doesBrandExist() && this.product.brands.length < this.maxBrands) {
      const brandId: number = this.getId();
      this.product.brands.push(new Brand(brandId, this.myControl.value));
    }
    document.getElementById('product-brand').focus();
  }

  public removeBrand(brandName: string): void {
    let i: number = 0;

    for (const brand of this.product.brands) {
      if (brandName === brand.name) {
        this.product.brands.splice(i, 1);
      }
      i++;
    }
    document.getElementById('product-brand').focus();
  }

  private hasType(): boolean {
    for (const brand of this.product.brands) {
      if (brand.name === this.myControl.value) {
        return true;
      }
    }
    return false;
  }

  private doesBrandExist(): boolean {
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
}
