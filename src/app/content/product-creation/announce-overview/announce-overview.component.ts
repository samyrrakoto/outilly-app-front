import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Sale } from 'src/app/models/sale';
import { Seller } from 'src/app/models/seller';
import { Product } from 'src/app/models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-announce-overview',
  templateUrl: './announce-overview.component.html',
  styleUrls: ['../product-creation.component.css', './announce-overview.component.css']
})
export class AnnounceOverviewComponent extends ProductCreationComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  productCreated: boolean;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidator: FormValidatorService,
    public auth: AuthService,
    public location: Location) {
      super(request, formData, router, formValidator);
      this.product = formData.product;
    }

  ngOnInit(): void {
    this.formData.isProductComplete = true;
    this.isLoggedIn = this.auth.isLoggedIn();
    this.setProductSession();
    this.mapSessionProductToFormData();
  }

  private mapSessionProductToFormData(): void {
    if (sessionStorage.getItem("current_product") === null) {
      this.formData.isProductComplete = false;
      this.backToStart();
    } else if (!this.checkProductExistsInSession()) {
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
    return this.formData.product.id != 0 && this.formData.product.strId != null;
  }

  signInOrUp(hasAccount: boolean): void {
    let target: string;

    sessionStorage.setItem("redirect_after_login", this.location.path());
    target = hasAccount ? 'login' : 'onboarding';
    this.router.navigate([target]);
  }

  submitProduct(): void {
    const sale: Sale = new Sale();
    const seller: Seller = new Seller();
    const product: Product = new Product();
    this.formData.product.weight = this.formData.product.weightUnity === 'kg'? this.formData.product.weight *= 1000 : this.formData.product.weight;
    this.formData.product.reservePrice *= 100;

    seller.id = +sessionStorage.getItem("userId");
    product.id = this.formData.product.id;
    product.strId = this.formData.product.strId;
    sale.seller = seller;
    sale.product = product;
    sale.id = null;
    const productPayload = {
      product: this.formData.product
    };
    const salePayload = {
      sale: sale
    }
    //console.log(JSON.stringify(payload));
    this.request.updateProduct(productPayload).subscribe((res: any) => {
      if (res.status === 201)
      {
        console.log("Product created in API with success");
        this.request.createSale(salePayload).subscribe((res: any) => {
          if (res.status === 201)
          {
            console.log("Sale created in API with success");
            console.log(res.body);
          } else {
            console.error("Error creating sale");
          }
        })
      } else {
        console.error("Error creating product");
      }
    });
  }
}
