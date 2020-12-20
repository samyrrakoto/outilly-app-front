import { prices } from './../../parameters';
import { MondialRelayManagerService } from 'src/app/services/mondial-relay-manager.service';
import { Bid } from 'src/app/models/bid';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { PurchaseManagerService } from 'src/app/services/purchase-manager.service';
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
  mrCosts: number;
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
    public mrManager: MondialRelayManagerService,
    private title: Title)
  {
    super();
    this.sale = new Sale();
    this.genericQuestions = [];
    this.openMenuState = false;
  }

  ngOnInit(): void {
    this.activated = localStorage.getItem('userStatus') === 'activated';
    this.getId()
      .then(() => {
        return this.auth.isLogged() ? this.getSale(true) : this.getSale(false);
      })
      .then(() => { this.getSaleAvailability(this.id) })
      .then(() => this.getPriceToPay())
      .then(() => this.getMinAndMax())
      .then(() => this.getMondialRelayCosts())
      .then(() => this.userManager.getUserId())
      .then((userId) => this.isSeller = this.sale.seller.id === userId )
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

  private getMinAndMax(): Promise<void> {
    return new Promise((resolve) => {
      this.minPrice = Math.round(this.sale.product.reservePrice * prices.MIN_PRICE_FACTOR / 100);
      this.maxPrice = this.sale.product.reservePrice / 100 - 1;
      resolve();
    })
  }

  private getMondialRelayCosts(): Promise<void> {
    return new Promise((resolve) => {
      if (this.sale.product.weight > 0) {
        this.mrManager.getMondialRelayCosts(this.sale.product.weight).subscribe(
          (res: any) => {
            this.mrCosts = res.cost;
            resolve();
          }
        )
      }
      resolve();
    });
  }

  private getSaleAvailability(saleId: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this.saleManager.getSaleAvailability(saleId)
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

  private getSale(logged: boolean): Promise<void> {
    return new Promise((resolve) => {
      if (logged) {
        this.request.getData(this.request.uri.GET_SALE_VENDOR, [this.id.toString()]).subscribe({
          next: (sale: any) => {
            this.sale = sale;
            resolve();
          },
          error: () => {
            this.router.navigate(['/error404']);
          }
        });
      }
      else {
        this.request.getData(this.request.uri.GET_SALE, [this.id.toString()]).subscribe({
          next: (sale: any) => {
            this.sale = sale;
            resolve();
          },
          error: () => {
            this.router.navigate(['/error404']);
          }
        });
      }
    });
  }

  public getOpenState(state: boolean): void {
    this.openMenuState = state;
  }

  private getPriceToPay(): void {
    const bid: Bid = new Bid();

    if (this.auth.isLogged()) {
      this.userManager.getPurchases()
        .then((purchases) => {
          if (purchases.length !== 0) {
            this.userManager.getBid(this.sale.id, purchases);

            if (this.userManager.hasBidded(this.sale.id, purchases)) {
              if (bid.counterOfferAmount > 0) {
                this.priceToPay = bid.counterOfferAmount;
              }
              this.priceToPay = bid.isAccepted ? bid.amount : this.sale.product.reservePrice;
            }
            else {
              this.priceToPay = this.sale.product.reservePrice;
            }
          }
          else {
            this.priceToPay = this.sale.product.reservePrice;
          }
        });
    }
    else {
      this.priceToPay = this.sale.product.reservePrice;
    }
  }
}
