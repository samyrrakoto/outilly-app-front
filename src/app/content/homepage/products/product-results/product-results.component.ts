import { Observable } from 'rxjs';
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
  readonly resultsPerPage: number = 5;
  loaded: boolean = false;
  currentPage: number = 1;
  sales: Observable<any>;
  categoryId: number;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
    )
  {
  }

  ngOnInit(): void {
    this.getCategoryId()
      .then(() => this.getSales());
  }

  public getSales(): void {
    this.getSalesByCriteria().subscribe(
      (res: any) => {
        this.sales = res;
      });
  }

  private getCategoryId(): Promise<void> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params: any) => {
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

  public getSalesByCriteria(): Observable<any> {
    const payload: HttpParams = this.getSalesPayload();
    const requestname: string = this.request.uri.SALES + '?' + payload.toString();

    return new Observable((observer) => {
      this.request.getData(requestname).subscribe(
        (sales: any) => {
          observer.next(sales.results);
          observer.complete();
          this.currentPage++;
          this.loaded = true;
        }
      );
    });
  }

  public getProductRoute(sale: any): string {
    return '/product/' + sale.productSlug + '/' + sale.id;
  }

  public getBackgroundImgUrl(path: string): string {
    return "url('" + this.mediaBaseUri + path + "')";
  }
}
