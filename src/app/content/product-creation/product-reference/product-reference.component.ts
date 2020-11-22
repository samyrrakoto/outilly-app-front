import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductCreationComponent } from './../product-creation.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { ProductCategory } from 'src/app/models/product-category';

@Component({
  selector: 'app-product-reference',
  templateUrl: './product-reference.component.html',
  styleUrls: ['./product-reference.component.css']
})
export class ProductReferenceComponent extends ProductCreationComponent implements OnInit {
  @ViewChild("matOption") matOption: ElementRef;
  myControl = new FormControl();
  references: string[];
  filteredOptions: Observable<Array<string>>;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService)
  {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productReference";
    this.stepNb = 7;
    this.stepName = "Quelle est la référence de votre produit ?";
    this.formData.path.previous = "product-type";
    this.formData.path.next = "product-state";
    this.placeholder = "Commencez à écrire le nom d'une référence et sélectionnez-la";
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

    return this.references.filter(references => references.toLowerCase().includes(filterValue)).sort();
  }

  private getParams(): string[] {
    const params: string[] = [];
    const categories: ProductCategory[] = this.product.productCategories === null ? this.product.productCategories : [new ProductCategory(null, 1)];
    const isConsumable: boolean = this.product.isConsumable;

    categories.length === 1 ?
    params.push(categories[0].id.toString()) :
    params.push(categories[0].id.toString() + '-' + categories[1].id.toString());

    isConsumable ? params[0] += '?isConsumable=1' : null;
    return params;
  }

  private getReferences(): Promise<any> {
    const params: string[] = this.getParams();

    return new Promise(
      (resolve) => {
        this.request.getData(this.request.uri.REFERENCES, params).subscribe(
          (references) => {
            for (const reference of references) {
              this.references.push(reference.label);
            }
            resolve();
          });
      });
  }

  public chooseReference(): void {
    this.filterTreatment();
  }
}
