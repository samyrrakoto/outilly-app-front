import { Bid } from 'src/app/models/bid';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
import { prices } from 'src/app/parameters';
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
  loaded: boolean = false;
  activated: boolean = false;
  isLogged: boolean;
  isAvailable: boolean;
  isSeller: boolean;
  id: number;
  sale: Sale;
  genericQuestions: Array<string>;
  proposedPrice: number;
  minPrice: number;
  maxPrice: number;
  errorMsg: any;
  openMenuState: boolean;
  priceToPay: number;
  pageNameManager: PageNameManager = new PageNameManager(this.title);

  constructor(
    public request: RequestService,
    public router: Router,
    private route: ActivatedRoute,
    public userManager: UserManagerService,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public purchaseManager: PurchaseManagerService,
    public auth: AuthService,
    private title: Title)
  {
    super();
    this.sale = new Sale();
    this.genericQuestions = [];
    this.openMenuState = false;
  }

  ngOnInit(): void {
      this.getId()
        .then(() => { return this.auth.isLogged() ? this.userManager.getPurchases() : null })
        .then(() => this.getSaleAvailability(this.id))
        .then(() => this.getProductById(this.id.toString()))
        .then(() => this.handleSaleStatus())
        .then(() => this.getPriceToPay())
        .then(() => this.loaded = true );
  }

  private getId(): Promise<void> {
    return new Promise((resolve) => {
      this.route.params.subscribe((params: any) => {
        this.id = parseInt(params.id);
        resolve();
      });
    });
  }

  private getSaleAvailability(saleId: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.saleManager.getSaleAvailability(this.id)
        .then((isAvailable) => {
          this.isAvailable = isAvailable;
          resolve();
        });
    });
  }

  private sortByMediaType(): void {
    const imgMedias: Array<ProductMedia> = [];
    const videoMedias: Array<ProductMedia> = [];

    for (const media of this.sale.product.productMedias) {
      media.type === 'video' ? videoMedias.push(media) : imgMedias.push(media);
    }

    this.sale.product.productMedias = videoMedias.concat(imgMedias);
  }

  private getProductById(id: string): Promise<void> {
    return new Promise((resolve) => {
      const response: any = this.isSeller
      ? this.request.getData(this.request.uri.GET_SALE_VENDOR, [id])
      : this.request.getData(this.request.uri.SALE, [id]);

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

  public getOpenState(state: boolean): void {
    this.openMenuState = state;
  }

  private getPriceToPay(): void {
    if (this.auth.isLogged()) {
      const bid: Bid = this.userManager.getBid(this.sale.id);

      if (this.userManager.hasBidded(this.sale.id)) {
        if (bid.counterOfferAmount > 0) {
          this.priceToPay = bid.counterOfferAmount;
        }
        this.priceToPay = bid.isAccepted ? bid.amount : this.priceToPay = this.sale.product.reservePrice;
      }
      else {
        this.priceToPay = this.sale.product.reservePrice;
      }
    }
    else {
      this.priceToPay = this.sale.product.reservePrice;
    }
  }
}
