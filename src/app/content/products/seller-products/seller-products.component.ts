import { productDisplay } from 'src/app/parameters';
import { Sale } from 'src/app/models/sale';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  loaded: boolean = false;
  loading: boolean = false;
  sellerId: number;
  sales: Sale[] = [];
  currentPage: number = 1;
  totalNbResults: number;
  resultsLeft: number = 0;
  noMoreResults: boolean = false;
  readonly resultsPerPage: number = productDisplay.NB_RESULTS;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
  )
  { }

  ngOnInit(): void {
    this.getSellerId()
      .then(() => this.getSales())
      .then(() => this.loaded = true);
  }

  private getSellerId(): Promise<void> {
    return new Promise((resolve) => {
      this.route.params.subscribe(
      (params) => {
        this.sellerId = +params['sellerId'];
        resolve();
      });
    });
  }

  private getPayload(): string {
    return '?page=' + this.currentPage + '&sellers=' + this.sellerId.toString() + '&resultsPerPage=' + this.resultsPerPage;
  }

  private getSales(): Promise<void> {
    this.loading = true;
    this.noMoreResults = false;

    return new Promise((resolve) => {
      this.request.getData(this.request.uri.SALES + this.getPayload()).subscribe(
        (sales: any) => {
          if (this.currentPage <= sales.meta.totalPages) {
            this.currentPage++;
            this.totalNbResults = sales.meta.totalResults;
            this.sales = this.sales.concat(sales.results);
          }
          if (this.currentPage - 1 === sales.meta.totalPages) {
            this.noMoreResults = true;
          }
          this.resultsLeft = sales.meta.totalResults - ((this.currentPage - 1) * this.resultsPerPage);
          this.loading = false;
          resolve();
        }
      );
    });
  }

  public loadMoreHandle(): void {
    this.getSales();
  }
}
