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

@Component({
  selector: 'app-announce-overview',
  templateUrl: './announce-overview.component.html',
  styleUrls: ['../product-creation.component.css', './announce-overview.component.css']
})
export class AnnounceOverviewComponent extends ProductCreationComponent  implements OnInit {

  isLoggedIn: Observable<boolean>;
  productCreated: boolean;

  constructor(
    public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidator: FormValidatorService,
    public auth: AuthService
    ) {
      super(request, formData, router, formValidator);
      this.product = formData.product;
    }

  ngOnInit(): void {
    this.formData.isComplete = true;
    this.isLoggedIn = this.auth.isLoggedIn();
    this.setProductSession();
    this.mapSessionProductToFormData();
  }

  setFocus(id: string): void {
    const tiles = ['yes', 'no'];

    document.getElementById(id).classList.add('chosen-tile');

    for (const tile of tiles) {
      if (tile !== id) {
        document.getElementById(tile).classList.remove('chosen-tile');
      }
    }
  }

  private mapSessionProductToFormData(): void
  {
    if(sessionStorage.getItem("current_product") === null) {
      this.formData.isComplete = false;
      this.backToStart();
    } else if (!this.checkProductExistsInSession()) {
      this.formData.product = JSON.parse(sessionStorage.getItem("current_product"));
    }
  }

  private backToStart(): void
  {
    this.router.navigate(['product/create']);
  }

  private setProductSession(): void
  {
    if (this.checkProductExistsInSession()) {
      sessionStorage.setItem("current_product", JSON.stringify(this.formData.product));
    }
  }

  private checkProductExistsInSession(): boolean
  {
    return (this.formData.product.id != 0 && this.formData.product.strId != null);
  }

  signInOrUp(hasAccount)
  {
    sessionStorage.setItem("redirect_after_login", "product/create/announce-overview");
    let target;
    if (hasAccount === true) {
      target = "login";
    } else {
      target = "onboarding"
    }
    this.router.navigate([target]);
  }

  submitProduct()
  {
    if (this.formData.product.weightUnity === 'kg') {
      this.formData.product.weight *= 1000;
    }
    let productPayload = {
      product : this.formData.product
    };
    let sale = new Sale();
    let seller = new Seller();
    seller.id = +sessionStorage.getItem("userId");
    let product = new Product();
    product.id = this.formData.product.id;
    product.strId = this.formData.product.strId;
    sale.seller = seller;
    sale.product = product;
    sale.id = null;
    let salePayload = {
      sale: sale
    }
    //console.log(JSON.stringify(payload));
    this.request.updateProduct(productPayload).subscribe(res => {
      if (res.status === 201)
      {
        console.log("Product created in API with success");
        this.request.createSale(salePayload).subscribe(res => {
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
