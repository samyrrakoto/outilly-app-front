import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  testImg: any[];

  constructor() {
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

}
