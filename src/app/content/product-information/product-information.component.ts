import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Vendor } from 'src/app/models/vendor';
import { RequestService } from 'src/app/services/request.service';
import { Sale } from 'src/app/models/sale';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  vendor: Vendor;
  vendorProducts: string;
  product: Product;
  descriptionFlag: boolean;
  knowMore: string;
  readMore: string;
  localisation: string;
  pictures: Array<string>;
  sale: Sale;

  constructor(public request: RequestService) {
    this.vendor = new Vendor();
    this.sale = new Sale();
    this.vendorProducts = "";
    this.product = new Product();
    this.descriptionFlag = false;
    this.knowMore = "";
    this.readMore = "";
    this.localisation = "";
    this.pictures = ["a", "a", "a"];
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    let response = this.request.getData(this.request.uri.SALE, "1");

    response.subscribe((res: HttpResponse<any>) => {
      console.log(res.id);
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
}
