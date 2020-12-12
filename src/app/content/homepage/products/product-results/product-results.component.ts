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
  readonly resultsPerPage: number = 10;
  currentPage: number = 1;
  sales: any;
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
    )
  {
    this.sales = {'results': [], 'meta': {}};
  }

  ngOnInit(): void {
    this.getCategoryId()
      .then(() => this.getSales());
  }

  private getCategoryId(): Promise<void> {
    return new Promise((resolve) => {
      this.route.params.subscribe((params: any) => {
        this.categoryId = parseInt(params.category);
        resolve();
      });
    });
  }

  private getSalesPayload(): HttpParams {
    let payload: HttpParams = new HttpParams();

    this.categoryId !== null ? payload = payload.append('categories', this.categoryId.toString()) : null;
    payload = payload.append('resultsPerPage', (this.currentPage * this.resultsPerPage).toString());
    return payload;
  }

  public getSales(): Promise<void> {
    const payload: HttpParams = this.getSalesPayload();
    const requestname: string = this.request.uri.SALES + '?' + payload.toString();

    return new Promise((resolve) => {
      this.request.getData(requestname).subscribe(
        (sales: any) => {
          this.sales.results = sales.results;
          this.currentPage++;
          resolve();
        }
      );
    });
  }

  public getProductRoute(sale: any): string {
    return '/product/' + sale.product.slug + '/' + sale.id;
  }
}
