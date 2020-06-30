import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {
  product: Product;
  descriptionFlag: boolean;
  active: string;
  previewActive: string;

  constructor() {
    this.product = new Product();
    this.descriptionFlag = false;
    this.active = "";
    this.previewActive = "";
  }

  ngOnInit(): void {
  }

  displayDescription() {
    this.descriptionFlag ? this.descriptionFlag = false : this.descriptionFlag = true;
  }

  openKnowMore() {
    this.active = "is-active";
  }

  closeKnowMore() {
    this.active = "";
  }

  openPreview() {
    this.previewActive = "is-active";
  }

  closePreview() {
    this.previewActive = "";
  }
}
