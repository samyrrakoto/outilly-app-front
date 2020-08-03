import { Component, OnInit, Input } from '@angular/core';
import { Vendor } from 'src/app/models/vendor';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';
import { Media } from 'src/app/models/media';
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
  vendor: Vendor;
  vendorProducts: string;
  descriptionFlag: boolean;
  shortDescription: string;
  knowMore: string;
  localisation: string;
  sale: Sale;
  inputProperties: Array<string>;
  genericQuestions: Array<string>;
  deliveryName: string;
  deliveryFees: number;
  proposedPrice: number;
  minPrice: number;
  maxPrice: number;
  errorMsg: any;

  constructor(public request: RequestService, private route: ActivatedRoute) {
    super();
    this.vendor = new Vendor();
    this.sale = new Sale();
    this.vendorProducts = '';
    this.descriptionFlag = false;
    this.knowMore = '';
    this.modals = {
      knowMore: ''
    };
    this.genericQuestions = [];
    this.deliveryName = 'Mondial Relay';
    this.deliveryFees = 6.90;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.getProductById(this.id.toString());
    this.getGenericQuestions();
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
      this.proposedPrice = this.sale.product.reservePrice;
      this.minPrice = this.sale.product.reservePrice * 0.8;
      this.maxPrice = this.sale.product.reservePrice * 2;
      this.errorMsg = {
        delivery: 'Veuillez choisir un mode de livraison',
        lowPrice: 'Votre prix est trop bas : votre proposition doit être supérieure à ' + this.minPrice
      };
      this.sortByMediaType();
    });
  }

  private getGenericQuestions(): void {
    const response = this.request.getData(this.request.uri.GENERIC_QUESTIONS);

    response.subscribe((res) => {
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
      this.media.index += 1;
    }
    this.media.type = this.sale.product.productMedias[this.media.index].type;
    this.media.path = this.sale.product.productMedias[this.media.index].path;
  }
}
