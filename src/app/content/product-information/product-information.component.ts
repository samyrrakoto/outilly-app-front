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

  constructor(public request: RequestService, private route: ActivatedRoute, public bidManager: BidManagerService) {
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
    this.getId();
    this.getProductById(this.id.toString());
    this.getGenericQuestions();
    this.getSalesId();
  }

  private getId(): void {
    this.route.params.subscribe((params: any) => {
      this.id = parseInt(params.id);
    });
  }

  private getSalesId(): void {
    this.request.getUserInfos().subscribe({
      next: (user: any) => {
        for (const sale of user.sales) {
          this.sales.push(sale);
        }
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

  private getProductById(id: string): void {
    const response = this.request.getData(this.request.uri.SALE, id);

    response.subscribe((res) => {
      this.sale = res;
      this.sale.product.reservePrice /= 100;
      this.proposedPrice = this.sale.product.reservePrice;
      this.minPrice = this.sale.product.reservePrice * 0.8;
      this.maxPrice = this.sale.product.reservePrice - 1;
      this.errorMsg = {
        delivery: 'Veuillez choisir un mode de livraison',
        lowPrice: 'Votre prix est trop bas : votre proposition doit être supérieure à ' + this.minPrice,
        highPrice: 'Votre prix est trop haut : votre proposition doit être inférieure à ' + this.maxPrice
      };
      this.sortByMediaType();
    });
  }

  private getGenericQuestions(): void {
    const response = this.request.getData(this.request.uri.GENERIC_QUESTIONS);

    response.subscribe((res: any) => {
      this.genericQuestions = res;
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

    if (this.media.index === 0) {
      this.media.index = lastIndex;
    }
    else {
      this.media.index -= 1;
    }

    this.media.type = this.sale.product.productMedias[this.media.index].type;
    this.media.path = this.sale.product.productMedias[this.media.index].path;
  }

  nextMedia(): void {
    const lastIndex = this.sale.product.productMedias.length - 1;

    if (this.media.index === lastIndex) {
      this.media.index = 0;
    }
    else {
      this.media.index++;
    }

    this.media.type = this.sale.product.productMedias[this.media.index].type;
    this.media.path = this.sale.product.productMedias[this.media.index].path;
  }

  getOpenState(state: boolean): void {
    this.openMenuState = state;
  }
}
