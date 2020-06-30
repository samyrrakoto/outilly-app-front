import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Vendor } from 'src/app/models/vendor';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  vendor: Vendor;
  product: Product;
  descriptionFlag: boolean;
  knowMore: string;
  readMore: string;
  localisation: string;
  vendorProducts: string;
  pictures: Array<string>;

  constructor() {
    this.vendor = new Vendor();
    this.product = new Product();
    this.descriptionFlag = false;
    this.knowMore = "";
    this.readMore = "";
    this.localisation = "";
    this.vendorProducts = "";
    this.pictures = ["a", "b", "c"];
  }

  ngOnInit(): void {
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
}
