import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Product } from 'src/app/models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-announce-overview',
  templateUrl: './announce-overview.component.html',
  styleUrls: ['../product-creation.component.css', './announce-overview.component.css']
})
export class AnnounceOverviewComponent extends ProductCreationComponent implements OnInit {
  public productCreated: boolean;
  public isLogged: boolean;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidator: FormValidatorService,
    public auth: AuthService,
    public location: Location)
    {
      super(request, formData, router, formValidator);
      this.product = formData.product;
    }

  ngOnInit(): void {
    this.auth.getLogStatus()
      .then(() => {
        this.isLogged = this.auth.logged && this.auth.accessToken === 'good';
        this.formData.isProductComplete = true;
        this.setProductSession();
        this.mapSessionProductToFormData();
      });
  }

  private mapSessionProductToFormData(): void {
    if (sessionStorage.getItem("current_product") === null) {
      this.formData.isProductComplete = false;
      this.backToStart();
    }
    else if (!this.checkProductExistsInSession()) {
      this.formData.product = JSON.parse(sessionStorage.getItem("current_product"));
    }
  }

  private backToStart(): void {
    this.router.navigate(['product/create']);
  }

  private setProductSession(): void {
    if (this.checkProductExistsInSession()) {
      sessionStorage.setItem("current_product", JSON.stringify(this.formData.product));
    }
  }

  private checkProductExistsInSession(): boolean {
    return this.formData.product.id !== 0 && this.formData.product.strId !== null;
  }

  public signInOrUp(hasAccount: boolean): void {
    const target: string = hasAccount ? 'login' : 'onboarding';

    sessionStorage.setItem("redirect_after_login", this.location.path());
    this.router.navigate([target]);
  }

  private getProductPayload(): any {
    const product: Product = this.formData.product;
    const weight: number = product.weightUnity === 'kg'? product.weight * 1000 : product.weight;
    const payload: any = {
      "product": {
        "id": product.id,
        "strId": product.strId,
        "name": product.name,
        "description": product.description,
        "quality": product.quality,
        "isBundle": product.isBundle,
        "buyingOption": product.buyingOption,
        "reservePrice": product.reservePrice * 100,
        "weight": weight,
        "locality": product.locality,
        "toDeliver": product.todeliver,
        "isWarrantied": product.isWarrantied,
        "warrantyDuration": product.warrantyDuration,
        "productCategories": product.productCategories,
        "productTypes": product.productTypes,
        "brands": product.brands,
        "productMedias": product.productMedias
      }
    };
    return payload;
  }

  private getSalePayload(): any {
    const payload: any = {
      "sale": {
        "id": null,
        "product": this.getProductPayload().product,
        "seller": {
          "id": +sessionStorage.getItem("userId")
        }
      }
    };
    return payload;
  }

  public submitProduct(): void {
    const productPayload: any = this.getProductPayload();
    const salePayload: any = this.getSalePayload();

    this.request.updateProduct(productPayload).subscribe((product: any) => {
      if (product.status === 201)
      {
        this.request.createSale(salePayload).subscribe((sale: any) => {
          if (sale.status !== 201) {
            console.error("Error creating sale");
          }
        });
      }
      else {
        console.error("Error creating product");
      }
    });
  }
}
