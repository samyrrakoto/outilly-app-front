import { ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { AppComponent } from './../app.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  @Input() placeholder: string = 'Rechercher un produit';
  config: any;
  searchQuery: string = '';
  currentQuery: string = '';

  constructor(
    public appcomponent: AppComponent,
    private route: ActivatedRoute)
  {
    this.config = appcomponent.configOutilly;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.searchQuery = params['query'];
      }
    });
  }

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
