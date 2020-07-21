import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Vendor } from 'src/app/models/vendor';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';
import { ActivatedRoute } from '@angular/router';
import { ProductMedia } from 'src/app/models/product-media';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  id: number;
  vendor: Vendor;
  vendorProducts: string;
  product: Product;
  descriptionFlag: boolean;
  shortDescription: string;
  knowMore: string;
  readMore: string;
  localisation: string;
  mediaModal: string;
  mediaPath: string;
  mediaIndex: number;
  mediaType: string;
  @Input() sale: Sale;
  inputProperties: Array<string>;

  constructor(public request: RequestService, private route: ActivatedRoute) {
    this.vendor = new Vendor();
    this.sale = new Sale();
    this.vendorProducts = "";
    this.product = new Product();
    this.descriptionFlag = false;
    this.knowMore = "";
    this.readMore = "";
    this.localisation = "";
    this.mediaModal = "";
    this.mediaPath = "";
    this.mediaIndex = 0;
    this.mediaType = "image";
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProductById(this.id.toString());
  }

  sortByMediaType() {
    let medias: Array<ProductMedia> = [];

    for (let media of this.sale.product.productMedias) {
      if (media.type == 'video')
        medias.push(media);
    }

    for (let media of this.sale.product.productMedias) {
      if (media.type == 'image')
        medias.push(media);
    }

    this.sale.product.productMedias = medias;
  }

  private getProductById(id: string) {
    let response = this.request.getData(this.request.uri.SALE, id);

    response.subscribe((res) => {
      this.sale = res;
      this.sortByMediaType();
    });
  }

  displayDescription() {
    this.descriptionFlag ? this.descriptionFlag = false : this.descriptionFlag = true;
  }

  openModal(modal: string): void {
    this[modal] = "is-active";
  }

  closeModal(modal: string): void {
    this[modal] = "";
  }

  openMedia(mediaPath: string): void {
    this.mediaPath = mediaPath;
    this.mediaModal = "is-active";
  }

  openGalleryMedia(mediaIndex: number, mediaType: string): void {
    this.mediaIndex = mediaIndex;
    this.mediaPath = this.sale.product.productMedias[mediaIndex].path;
    this.mediaType = mediaType;
    this.mediaModal = "is-active";
  }

  closeMedia(): void {
    this.mediaModal = "";
  }

  previousMedia(): void {
    let lastIndex = this.sale.product.productMedias.length - 1;

    if (this.mediaIndex == 0)
      this.mediaIndex = lastIndex;
    else
      this.mediaIndex -= 1;
    this.mediaType = this.sale.product.productMedias[this.mediaIndex].type;
    this.mediaPath = this.sale.product.productMedias[this.mediaIndex].path;
  }

  nextMedia(): void {
    let lastIndex = this.sale.product.productMedias.length - 1;

    if (this.mediaIndex == lastIndex)
      this.mediaIndex = 0;
    else
      this.mediaIndex += 1;
    this.mediaType = this.sale.product.productMedias[this.mediaIndex].type;
    this.mediaPath = this.sale.product.productMedias[this.mediaIndex].path;
  }
}
