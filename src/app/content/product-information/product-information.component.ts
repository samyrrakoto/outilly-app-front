import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Vendor } from 'src/app/models/vendor';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';
import { ActivatedRoute } from '@angular/router';

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
  imgModal: string;
  imgPath: string;
  pictures: Array<string>;
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
    this.imgModal = "";
    this.pictures = ["a", "a", "a"];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   });
    this.getProductById(this.id.toString());
  }

  private getProductById(id: string) {
    let response = this.request.getData(this.request.uri.SALE, id);

    response.subscribe((res) => {
      this.sale = res;
      console.log(this.sale);
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

  openImage(imgPath: string): void {
    this.imgPath = imgPath;
    this.imgModal = "is-active";
  }

  closeImage(): void {
    this.imgModal = "";
  }
}
