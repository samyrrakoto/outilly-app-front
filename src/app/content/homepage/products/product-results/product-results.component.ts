import { productDisplay } from 'src/app/parameters';
import { RequestService } from 'src/app/services/request.service';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-results',
  templateUrl: './product-results.component.html',
  styleUrls: ['../products.component.css', './product-results.component.css']
})
export class ProductResultsComponent implements OnInit {
  readonly maxTitleSize: number = 42;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly resultsPerPage: number = productDisplay.NB_RESULTS;
  noMoreResults: boolean = false;
  resultsLeft: number = 0;
  loading: boolean = false;
  loaded: boolean = false;
  currentPage: number = 1;
  sales: any[] = [];
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
    )
  {}

  ngOnInit(): void {
    this.getCategoryId(true);
  }

  public getSales(change: boolean): void {
    this.loading = true;
    this.currentPage = change ? 1 : this.currentPage;
    change ? this.sales = [] : null;
    this.getSalesByCriteria();
  }

  private getCategoryId(change: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params: any) => {
        this.categoryId = parseInt(params.category);
        this.getSales(change);
        resolve();
      });
    });
  }

  public getSalesByCriteria(): Promise<void> {
    const payload: HttpParams = this.getSalesPayload();
    const requestname: string = this.request.uri.SALES + '?' + payload.toString();

    return new Promise((resolve) => {
      this.request.getData(requestname).subscribe(
        (sales: any) => {
          this.currentPage++;
          this.loaded = true;
          if (this.currentPage - 1 === sales.meta.totalPages) {
            this.noMoreResults = true;
          }
          this.resultsLeft = sales.meta.totalResults - ((this.currentPage - 1) * this.resultsPerPage);
          this.sales = this.sales.concat(sales.results);
          this.loading = false;
          resolve();
        }
      );
    });
  }

  private getSalesPayload(): HttpParams {
    let payload: HttpParams = new HttpParams();

    this.categoryId !== null ? payload = payload.append('categories', this.categoryId.toString()) : null;
    payload = payload.append('resultsPerPage', this.resultsPerPage.toString());
    payload = payload.append('currentPage', this.currentPage.toString());
    return payload;
  }

  public getProductRoute(sale: any): string {
    return '/product/' + sale.productSlug + '/' + sale.id;
  }

  public getBackgroundImgUrl(path: string): string {
    return "url('" + this.mediaBaseUri + path + "')";
  }
}
