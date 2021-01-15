import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['../products.component.css', './category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  @Input() sales: any[] = [];
  @Input() maxTitleSize: number;
  @Input() categoryId: number;
  @Input() categoryIcon: string;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly mobileNbMax: number = 1;

  constructor() {
    this.categoryIcon = 'box';
  }

  ngOnInit(): void {}

  public getProductRoute(sale: any): string {
    return '/product/' + sale.product.slug + '/' + sale.id;
  }

  public getBackgroundImgUrl(path: string): string {
    return "url('" + this.mediaBaseUri + path + "')";
  }
}
