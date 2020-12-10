import { environment } from 'src/environments/environment';
import { EncodingService } from 'src/app/services/encoding.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductCreationComponent } from './../product-creation.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { Product } from 'src/app/models/product';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-announce-overview',
  templateUrl: './announce-overview.component.html',
  styleUrls: ['../product-creation.component.css', './announce-overview.component.css']
})
export class AnnounceOverviewComponent extends ProductCreationComponent implements OnInit {
  public productCreated: boolean;
  public isLogged: boolean;
  public isSaleCreated: boolean;
  public productUrl: string;
  public isLoading: boolean;
  public nbPictures: number;
  public nbVideos: number;
  readonly mediaBaseUri: string = environment.mediaBaseUri;

  constructor(public request: RequestService,
    public formData: FormDataService,
    public router: Router,
    public formValidator: FormValidatorService,
    public auth: AuthService,
    public encoding: EncodingService,
    public location: Location,
    public title: Title)
  {
    super(request, formData, router, formValidator, title);
    this.product = formData.product;
    this.isSaleCreated = false;
    this.isLoading = false;
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
        "description": this.encoding.base64Encoder(product.description),
        "isDescriptionBase64": true,
        "isDescriptionHtml": false,
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
          if (sale.status === 201) {
            this.isSaleCreated = true;
            this.productUrl = '/product/' + sale.body.product.slug + '/' + sale.body.id;
            localStorage.removeItem('strId');
            localStorage.removeItem('id');
            sessionStorage.removeItem('current_product');
          }
          else {
            this.errorMessages.push('Une erreur est survenue pendant la création de l\'annonce. Veuillez réessayer');
          }
        });
      }
      else {
        this.errorMessages.push('Une erreur est survenue pendant la création de l\'annonce. Veuillez réessayer');
      }
    });
  }

  public goToProduct(): void {
    this.router.navigate([this.productUrl]);
  }

  public getNbMedia(mediaType: string = 'image') {
    let nb: number = 0;

    for (const media of this.formData.product.productMedias) {
      if (media.type === mediaType) {
        nb++;
      }
    }
    return nb;
  }
}
