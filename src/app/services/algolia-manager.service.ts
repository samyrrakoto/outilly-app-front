import { Injectable } from '@angular/core';
import { Sale } from 'src/app/models/sale';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaManagerService {

  constructor() { }

  public getSalesFromHits(hits: any[]): Sale[] {
    const sales: Sale[] = [];

    for (const hit of hits) {
      sales.push(this.saleMapping(hit));
    }
    return sales;
  }

  private saleMapping(hit: any): Sale {
    const sale: Sale = new Sale();

    sale.product.name = hit.product_name;
    sale.product.mainImageThumbnail.path = hit.thumbnail_uri;
    sale.product.reservePrice = hit.reserve_price * 100;
    sale.product.toDeliver = hit.to_deliver;
    sale.id = hit.sale_id;
    sale.productSlug = hit.slug;
    sale.product.locality = hit.locality;
    return sale;
  }
}
