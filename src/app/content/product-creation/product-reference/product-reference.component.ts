import { productOnboarding } from './../../../onboardings';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductReference } from 'src/app/models/product-reference';
import { Title } from '@angular/platform-browser';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-product-reference',
  templateUrl: './product-reference.component.html',
  styleUrls: ['../product-creation.component.css', './product-reference.component.css']
})
export class ProductReferenceComponent extends StepForm implements OnInit {
  readonly root: string = 'product/create/';
  additionalControls: boolean;
  @ViewChild("matOption") matOption: ElementRef;
  product: Product;
  myControl = new FormControl();
  references: any[];
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
    this.additionalControls = this.product.productReferences.length !== 0;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productReference";
    this.stepNb = 7;
    this.stepName = "Quel est le nom de votre produit ?";
    this.stepSubtitle = 'Vous pouvez en sélectionner jusqu\'à 5.';
    this.path.current = "product-reference";
    this.path.previous = this.formData.product.isConsumable ? "product-brand" : "product-type";
    this.path.next = "product-state";
    this.placeholder = "Commencez à écrire le nom d'un produit et sélectionnez-le";
    this.references = [];
  }

  ngOnInit(): void {
    this.getReferences()
      .then(() => this.filterTreatment());
  }

  ngAfterViewInit(): void {
    if (this.matOption) {
      this.matOption.nativeElement.openPanel();
    }
    document.getElementById('product-reference').focus();
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
    const labels: string[] = [];

    for (const reference of this.references) {
      labels.push(reference.label);
    }
    return labels.filter(references => references.toLowerCase().includes(filterValue)).sort();
  }

  private getParams(): string[] {
    const params: string[] = [];
    const categories: ProductCategory[] = this.product.productCategories;
    categories.length === 0 ? categories.push(new ProductCategory(null, 1)) : null;
    const isConsumable: boolean = this.product.isConsumable;

    categories.length === 1 ?
    params.push(categories[0].id.toString()) :
    params.push(categories[0].id.toString() + '-' + categories[1].id.toString());

    isConsumable ? params[0] += '?isConsumable=1' : null;
    return params;
  }

  private getReferences(): Promise<void> {
    const params: string[] = this.getParams();
    console.log(params);

    return new Promise(
      (resolve) => {
        this.request.getData(this.request.uri.REFERENCES, params).subscribe(
          (references: any) => {
            for (const reference of references) {
              this.references.push({'label': reference.label, 'id': reference.id});
            }
            resolve();
          });
      });
  }

  public addReference(): void {
    if (!this.hasType() && this.isReferenceExist() && this.product.productReferences.length < 5) {
      const referenceId: number = this.getId();
      this.product.productReferences.push(new ProductReference(this.myControl.value, referenceId));
    }
    if (this.product.productReferences.length === 5) {
      this.nextOn = true;
    }
    if (this.product.productReferences.length > 0) {
      this.additionalControls = true;
    }
    document.getElementById('product-reference').focus();
  }

  public removeReference(referenceName: string): void {
    let i: number = 0;

    for (const reference of this.product.productReferences) {
      if (referenceName === reference.label) {
        this.product.productReferences.splice(i, 1);
      }
      i++;
    }
    if (this.product.productReferences.length < 1) {
      this.additionalControls = false;
    }
    document.getElementById('product-reference').focus();
  }

  private hasType(): boolean {
    for (const reference of this.product.productReferences) {
      if (reference.label === this.myControl.value) {
        return true;
      }
    }
    return false;
  }

  private isReferenceExist(): boolean {
    for (const reference of this.references) {
      if (this.myControl.value === reference.label) {
        return true;
      }
    }
    return false;
  }

  private getId(): number {
    let i: number = 0;

    for (const reference of this.references) {
      if (this.myControl.value === reference) {
        return i + 1;
      }
      i++;
    }
    return -1;
  }
}
