import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../services/form-data.service';
import { RequestService } from './../../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/product-type';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['../product-creation.component.css', './product-type.component.css']
})
export class ProductTypeComponent extends ProductCreationComponent implements OnInit {
  types: Array<any>;
  private chosenTypes: number;
  readonly maxTypes: number = 100;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public title: Title)
  {
    super(request, formData, router, formValidatorService, title);
    if (JSON.parse(localStorage.getItem('formData'))) {
      !this.formData.product.name ? this.formData.product = JSON.parse(localStorage.getItem('formData')).product : null;
    }
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productType";
    this.stepNb = 6;
    this.stepName = "Quel est le type du produit que vous vendez ?";
    this.stepSubtitle = 'Vous pouvez en sélectionner autant que vous le souhaitez';
    this.formData.path.current = "product-type";
    this.formData.path.previous = "product-brand";
    this.formData.path.next = "product-reference";
    this.placeholder = "Commencez à écrire le nom d'un type de produit et sélectionnez-la";
    this.types = [];
    this.chosenTypes = 0;
  }

  ngOnInit(): void {
    this.getTypes();
  }

  ngAfterViewChecked(): void {
    for (const type of this.types) {
      for (const chosenTypes of this.product.productTypes) {
        if (type.label === chosenTypes.label) {
          document.getElementById(type.label).classList.add('chosen-tile');
        }
      }
    }
  }

  private getTypes(): Promise<any> {
    return new Promise(
      (resolve) => {
        const response = this.request.getData(this.request.uri.TYPES).subscribe((types) => {
          for (const type of types) {
            if (type.id !== 7) {
              this.types.push({'label': type.label, 'id': type.id});
            }
          }
          this.types.sort((a, b) => this.compareType(a, b));
          resolve();
      });
    });
  }

  private compareType(a: ProductType, b: ProductType): number {
    return a.label < b.label ? -1 : 1;
  }

  public setFocus(type: any): void {
    if (document.getElementById(type.label).classList.contains('chosen-tile')) {
      document.getElementById(type.label).classList.remove('chosen-tile');
      this.removeProductType(type.label);
    }
    else {
      if (this.chosenTypes < this.maxTypes && !this.hasType(type.label)) {
        document.getElementById(type.label).classList.add('chosen-tile');
        this.addProductType(type);
      }
    }
  }

  private addProductType(type: any): void {
    this.product.productTypes.push(new ProductType(type.label, type.id));
    this.chosenTypes++;
  }

  private removeProductType(type: string): void {
    const pos: number = this.findType(type);

    this.chosenTypes--;
    this.product.productTypes.splice(pos, 1);
  }

  private findType(type: string): number {
    let i: number = 0;

    for (const elem of this.product.productTypes) {
      if (elem.label === type) {
        return i;
      }
      i++;
    }
    return -1;
  }
  private hasType(currentType: string): boolean {
    for (const type of this.product.productTypes) {
      if (type.label === currentType) {
        return true;
      }
    }
    return false;
  }
}
