import { AccessToken } from './../../models/access-token';
import { AuthService } from './../../services/auth.service';
import { BidManagerService } from './../../bid-manager.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';
import { ActivatedRoute } from '@angular/router';
import { ProductMedia } from 'src/app/models/product-media';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent extends GenericComponent implements OnInit {
  isLogged: boolean;
  accessToken: string;
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
    private route: ActivatedRoute,
    public bidManager: BidManagerService,
    public auth: AuthService,) {
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
    this.isLogged = undefined;
    this.accessToken = '';
  }

  ngOnInit(): void {
    this.getLogStatus()
    .then(() => this.getId())
    .then(() => this.getProductById(this.id.toString()))
    .then(() => this.getGenericQuestions())
    .then(() => this.getSalesId());
  }

  private getLogStatus(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.auth.isLoggedIn().subscribe({
        next: (value: boolean) => {
          this.isLogged = value;
          resolve();
        },
        error: () => {
          this.isLogged = null;
          reject();
        }
      })
    });

    this.accessToken = this.getTokenStatus();
    return promise;
  }

  private getTokenStatus(): string {
    if (localStorage.getItem('access_token') === null) {
      return 'expired';
    }
    const accessToken: string = atob(localStorage.getItem('access_token').split('.')[1]);
    const timestamp: number = parseInt(JSON.parse(accessToken).exp + '000');
    const actualTimestamp: number = Date.now();

    return actualTimestamp > timestamp ? 'expired' : 'good';
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
      if (this.isLogged && this.getTokenStatus() === 'good') {
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
      const response = this.request.getData(this.request.uri.SALE, id);

      response.subscribe((res: any) => {
        this.sale = res;
        this.proposedPrice = this.sale.product.reservePrice;
        this.minPrice = this.sale.product.reservePrice * 0.8;
        this.maxPrice = this.sale.product.reservePrice - 1;
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
}
