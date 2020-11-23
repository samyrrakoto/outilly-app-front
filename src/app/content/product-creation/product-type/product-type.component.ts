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
  types: Array<any>;
  private chosenTypes: number;
  readonly maxTypes: number = 100;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService)
  {
    super(request, formData, router, formValidatorService);
    this.product = formData.product;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formData.fieldName = "productType";
    this.stepNb = 6;
    this.stepName = "Quel est le type du produit que vous vendez ?";
    this.stepSubtitle = 'Vous pouvez en sélectionner autant que vous le souhaitez';
    this.formData.path.previous = "product-brand";
    this.formData.path.next = "product-reference";
    this.placeholder = "Commencez à écrire le nom d'un type de produit et sélectionnez-la";
    this.types = [];
    this.chosenTypes = 0;
  }

  ngOnInit(): void {
    this.getTypes();
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
      this.removeProductCategory(type.label);
    }
    else {
      if (this.chosenTypes < this.maxTypes) {
        document.getElementById(type.label).classList.add('chosen-tile');
        this.addProductCategory(type);
      }
    }
}

private addProductCategory(type: any): void {
  this.product.productTypes.push(new ProductType(type.label, type.id));
  this.chosenTypes++;
}

private removeProductCategory(type: string): void {
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
}
