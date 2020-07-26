import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
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
  product: Product;
  descriptionFlag: boolean;
  shortDescription: string;
  knowMore: string;
  readMore: string;
  localisation: string;
  media: Media;
  @Input() sale: Sale;
  inputProperties: Array<string>;
  @Input() genericQuestions: Array<string>;

  constructor(public request: RequestService, private route: ActivatedRoute) {
    super();
    this.vendor = new Vendor();
    this.sale = new Sale();
    this.vendorProducts = '';
    this.product = new Product();
    this.descriptionFlag = false;
    this.knowMore = '';
    this.readMore = '';
    this.localisation = '';
    this.media = new Media();
    this.genericQuestions = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProductById(this.id.toString());
    this.getGenericQuestions();
  }

  sortByMediaType() {
    const imgMedias: Array<ProductMedia> = [];
    const videoMedias: Array<ProductMedia> = [];

    for (const media of this.sale.product.productMedias) {
      media.type === 'video' ? videoMedias.push(media) : imgMedias.push(media);
    }

    this.sale.product.productMedias = videoMedias.concat(imgMedias);
  }

  private getProductById(id: string) {
    const response = this.request.getData(this.request.uri.SALE, id);

    response.subscribe((res) => {
      this.sale = res;
      this.sortByMediaType();
    });
  }

  private getGenericQuestions() {
    const response = this.request.getData(this.request.uri.GENERIC_QUESTIONS);

    response.subscribe((res) => {
      this.genericQuestions = res;
    });
  }

  displayDescription() {
    this.descriptionFlag ? this.descriptionFlag = false : this.descriptionFlag = true;
  }

  openModal(modal: string): void {
    this[modal] = 'is-active';
  }

  closeModal(modal: string): void {
    this[modal] = '';
  }

  openMedia(mediaPath: string): void {
    this.media.path = mediaPath;
    this.media.modal = 'is-active';
  }

  openGalleryMedia(mediaIndex: number, mediaType: string): void {
    this.media.index = mediaIndex;
    this.media.path = this.sale.product.productMedias[mediaIndex].path;
    this.media.type = mediaType;
    this.media.modal = 'is-active';
  }

  closeMedia(): void {
    this.media.modal = '';
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
