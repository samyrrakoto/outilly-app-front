import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductMedia } from 'src/app/models/product-media';
import { GenericComponent } from 'src/app/models/generic-component';
import { BidManagerService } from 'src/app/services/bid-manager.service';
import { SaleManagerService } from 'src/app/services/sale-manager.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent extends GenericComponent implements OnInit {
  accessToken: string;
  isLogged: boolean;
  isAvailable: boolean;
  id: number;
  vendorProducts: string;
  descriptionFlag: boolean;
  shortDescription: string;
  knowMore: string;
  localisation: string;
  sale: Sale;
  sales: Array<Sale>;
  inputProperties: Array<string>;
  genericQuestions: Array<string>;
  proposedPrice: number;
  minPrice: number;
  maxPrice: number;
  errorMsg: any;
  openMenuState: boolean;

  constructor(public request: RequestService,
    public router: Router,
    private route: ActivatedRoute,
    public bidManager: BidManagerService,
    public saleManager: SaleManagerService,
    public auth: AuthService) {
    super();
    this.sale = new Sale();
    this.vendorProducts = '';
    this.descriptionFlag = false;
    this.knowMore = '';
    this.modals = {
      knowMore: ''
    };
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
      .then(() => this.getProductById(this.id.toString()))
      .then(() => this.getGenericQuestions())
      .then(() => this.getSalesId())
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
        this.request.getUserInfos().subscribe({
          next: (user: any) => {
            for (const sale of user.sales) {
              this.sales.push(sale);
            }
            resolve();
          }
        });
      }
      else {
        resolve();
      }
    });
  }

  public isSeller(): boolean {
    for (const sale of this.sales) {
      if (sale.id === this.id) {
        return true;
      }
    }
    return false;
  }

  sortByMediaType(): void {
    const imgMedias: Array<ProductMedia> = [];
    const videoMedias: Array<ProductMedia> = [];

    for (const media of this.sale.product.productMedias) {
      media.type === 'video' ? videoMedias.push(media) : imgMedias.push(media);
    }

    this.sale.product.productMedias = videoMedias.concat(imgMedias);
  }

  private getProductById(id: string): Promise<any> {
    return new Promise((resolve) => {
      const response = this.request.getData(this.request.uri.SALE, [id]);

      response.subscribe((sale: any) => {
        this.sale = sale;
        this.proposedPrice = this.sale.product.reservePrice / 100;
        this.minPrice = (this.sale.product.reservePrice / 100) * 0.8;
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
    if (this.sale.status === 'new' && !this.isSeller()) {
      this.router.navigate(['/error404']);
      return Promise.reject('SaleStatus');
    }
    return Promise.resolve();
  }

  private getGenericQuestions(): Promise<any> {
    return new Promise((resolve) => {
      const response = this.request.getData(this.request.uri.GENERIC_QUESTIONS);

      response.subscribe((res: any) => {
        this.genericQuestions = res;
        resolve();
      });
    });
  }

  displayDescription(): void {
    this.descriptionFlag ? this.descriptionFlag = false : this.descriptionFlag = true;
  }

  openGalleryMedia(mediaIndex: number, mediaType: string): void {
    this.media.index = mediaIndex;
    this.media.path = this.sale.product.productMedias[mediaIndex].path;
    this.media.type = mediaType;
    this.media.modal = 'is-active';
  }

  previousMedia(): void {
    const lastIndex = this.sale.product.productMedias.length - 1;

    this.media.index === 0 ? this.media.index = lastIndex : this.media.index -= 1;
    this.media.type = this.sale.product.productMedias[this.media.index].type;
    this.media.path = this.sale.product.productMedias[this.media.index].path;
  }

  nextMedia(): void {
    const lastIndex = this.sale.product.productMedias.length - 1;

    this.media.index === lastIndex ? this.media.index = 0 : this.media.index++;
    this.media.type = this.sale.product.productMedias[this.media.index].type;
    this.media.path = this.sale.product.productMedias[this.media.index].path;
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
