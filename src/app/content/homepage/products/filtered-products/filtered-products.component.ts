import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtered-products',
  templateUrl: './filtered-products.component.html',
  styleUrls: ['../products.component.css', './filtered-products.component.css']
})
export class FilteredProductsComponent implements OnInit {
  @Input() sales: any[];
  @Input() maxTitleSize: number;
  readonly mediaBaseUri: string = environment.mediaBaseUri;

  constructor() {
    this.sales = [];
  }

  ngOnInit(): void {
  }

  public getProductRoute(sale: any): string {
    return '/product/' + sale.product.slug + '/' + sale.id;
  }

  public getBackgroundImgUrl(path: string): string {
    return "url('" + this.mediaBaseUri + path + "')";
  }
}
