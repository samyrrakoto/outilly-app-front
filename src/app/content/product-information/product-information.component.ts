import { prices } from 'src/app/superglobal';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductMedia } from 'src/app/models/product-media';
import { GenericComponent } from 'src/app/models/generic-component';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';
import { Title } from '@angular/platform-browser';
import { PageNameManager } from 'src/app/models/page-name-manager';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent extends GenericComponent implements OnInit {
  accessToken: string;
  isLogged: boolean;
  isAvailable: boolean;
  isSeller: boolean;
  id: number;
  sale: Sale;
  sales: Array<Sale>;
  inputProperties: Array<string>;
  genericQuestions: Array<string>;
  proposedPrice: number;
  minPrice: number;
  maxPrice: number;
  errorMsg: any;
  openMenuState: boolean;
  pageNameManager: PageNameManager = new PageNameManager(this.title);

  constructor(
    public request: RequestService,
    public router: Router,
    private route: ActivatedRoute,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public auth: AuthService,
    private title: Title)
  {
    super();
    this.sale = new Sale();
    this.genericQuestions = [];
    this.openMenuState = false;
    this.sales = [];
  }

  ngOnInit(): void {
    this.auth.getLogStatus()
      .then(() => { this.getId() })
      .then(() => this.saleManager.getSaleAvailability(this.id.toString()))
      .then((isAvailable: boolean) => {
        return new Promise((resolve) => {
          this.isAvailable = isAvailable
          resolve();
        });
      })
      .then(() => this.getSalesId())
      .then(() => this.isUserSeller())
      .then(() => this.getProductById(this.id.toString()))
      .then(() => this.handleSaleStatus())
      .catch((error: any) => this.handlingErrors(error));
  }

  private getId(): Promise<any> {
    return new Promise((resolve) => {
      this.route.params.subscribe((params: any) => {
        this.id = parseInt(params.id);
        resolve();
      });
    });
  }

  private getSalesId(): Promise<any> {
    return new Promise((resolve) => {

      // If user logged and token is not expired
      if (this.auth.logged && this.auth.getTokenStatus() === 'good') {
        this.request.getUserInfos().subscribe(
          (user: any) => {
            for (const sale of user.sales) {
              this.sales.push(sale);
            }
            resolve();
          }
        );
      }
      else {
        resolve();
      }
    });
  }

  public isUserSeller(): Promise<any> {
    for (const sale of this.sales) {
      if (sale.id === this.id) {
        this.isSeller = true;
      }
    }
    return Promise.resolve();
  }

  private sortByMediaType(): void {
    const imgMedias: Array<ProductMedia> = [];
    const videoMedias: Array<ProductMedia> = [];

    for (const media of this.sale.product.productMedias) {
      media.type === 'video' ? videoMedias.push(media) : imgMedias.push(media);
    }

    this.sale.product.productMedias = videoMedias.concat(imgMedias);
  }

  private getProductById(id: string): Promise<any> {
    return new Promise((resolve) => {
      const response = this.isSeller ? this.request.getData(this.request.uri.GET_SALE_VENDOR, [id]) : this.request.getData(this.request.uri.SALE, [id]);

      response.subscribe((sale: any) => {
        this.sale = sale;
        this.pageNameManager.setTitle(sale.product.name);
        this.proposedPrice = this.sale.product.reservePrice / 100;
        this.minPrice = Math.round((this.sale.product.reservePrice / 100) * prices.MIN_PRICE_FACTOR);
        this.maxPrice = (this.sale.product.reservePrice / 100) - 1;
        this.errorMsg = {
          delivery: 'Veuillez choisir un mode de livraison',
          lowPrice: 'Votre prix est trop bas : votre proposition doit être supérieure à ' + this.minPrice,
          highPrice: 'Votre prix est trop haut : votre proposition doit être inférieure à ' + this.maxPrice
        };
        this.sortByMediaType();
        resolve();
      });
    });
  }

  private handleSaleStatus(): Promise<any> {
    if (this.sale.status === 'new' && !this.isSeller) {
      this.router.navigate(['/error404']);
      return Promise.reject('SaleStatus');
    }
    return Promise.resolve();
  }

  getOpenState(state: boolean): void {
    this.openMenuState = state;
  }

  /*
  ** ERROR HANDLING
  */
  private handlingErrors(errorName: string): void {
    this['handle' + errorName + 'Error']();
  }

  private handleSaleIdError(): void {
  }

  private handleSaleStatusError(): void {
  }

  private handleProductUnavailableError(): void {

  }
}
