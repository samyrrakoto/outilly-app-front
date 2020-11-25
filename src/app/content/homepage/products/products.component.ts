import { ProductType } from './../../../models/product-type';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  testImg: any[];

  constructor(private request: RequestService) {
    this.testImg = [
      {'path': 'assets/img/product/tool1.jpg', 'productName': 'Outil 1'},
      {'path': 'assets/img/product/tool2.jpg', 'productName': 'Outil 2'},
      {'path': 'assets/img/product/tool3.jpg', 'productName': 'Outil 3'},
      {'path': 'assets/img/product/tool4.jpg', 'productName': 'Outil 4'},
      {'path': 'assets/img/product/tool5.jpg', 'productName': 'Outil 5'}
    ];
  }

  ngOnInit(): void {
  }

  public displayThumbnail(imgPath: string): void {
    const thumbnail: HTMLElement = document.getElementById(imgPath);

    thumbnail.style.visibility = 'visible';
  }

  public hideThumbnail(imgPath: string): void {
    const thumbnail: HTMLElement = document.getElementById(imgPath);

    thumbnail.style.visibility = 'hidden';
  }
}
