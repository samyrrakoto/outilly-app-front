import { productDisplay } from 'src/app/parameters';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.css']
})
export class BrandProductsComponent implements OnInit {
  loaded: boolean = false;
  loading: boolean = false;
  brandId: number;
  brandName: string;
  sales: any[] = [];
  currentPage: number = 1;
  totalNbResults: number;
  noMoreResults: boolean = false;
  resultsLeft: number = 0;
  noResult: boolean = false;
  readonly resultsPerPage: number = productDisplay.NB_RESULTS;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.getBrandId(true)
      .then(() => this.loaded = true);
  }

  private getBrandId(change: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.route.params.subscribe(
        (params) => {
          this.brandId = +params['brandId'];
          change ? this.sales = [] : null;
          change ? this.loaded = false : null;
          change ? this.currentPage = 1 : null;
          this.noMoreResults = false;
          this.noResult = false;
          this.getBrandName()
            .then(() => this.getSales())
            .then(() => {
              this.loaded = true;
              resolve();
            })
          });
    });
  }

  private getBrandName(): Promise<void> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.BRANDS).subscribe(
        (brands: any) => {
          for (const brand of brands) {
            if (this.brandId === brand.id) {
              this.brandName = brand.name;
              resolve();
            }
          }
          resolve();
        }
      )
    });
  }

  private getPayload(): string {
    return '?page=' + this.currentPage + '&brands=' + this.brandId.toString() + '&resultsPerPage=' + this.resultsPerPage;
  }

  public getSales(): Promise<void> {
    this.loading = true;

    return new Promise((resolve) => {
      this.request.getData(this.request.uri.SALES + this.getPayload()).subscribe(
        (sales: any) => {
          if (this.currentPage <= sales.meta.totalPages) {
            this.totalNbResults = sales.meta.totalResults;
            this.sales = this.sales.concat(sales.results);
            this.currentPage++;
          }
          if (sales.meta.totalResults === 0) {
            this.totalNbResults = sales.meta.totalResults;
            this.noResult = true;
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
