import { Sale } from 'src/app/models/sale';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  sales: Sale[] = [];
  currentPage: number = 1;
  totalNbResults: number;
  noMoreResults: boolean = false;
  noResult: boolean = false;
  readonly resultsPerPage: number = 15;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.getBrandId()
      .then(() => this.loaded = true);
  }

  private getBrandId(): Promise<void> {
    return new Promise((resolve) => {
      this.route.params.subscribe(
        (params) => {
          this.brandId = +params['brandId'];
          this.getBrandName()
            .then(() => this.getSales().subscribe(
              (res: any) => {
                this.currentPage = 1;
                this.noResult = false;
                this.sales = res;
                resolve();
              }
            ));
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

  private getSales(): Observable<any> {
    this.loading = true;

    return new Observable((observer) => {
      this.request.getData(this.request.uri.SALES + this.getPayload()).subscribe(
        (sales: any) => {
          if (this.currentPage <= sales.meta.totalPages) {
            this.currentPage++;
            this.totalNbResults = sales.meta.totalResults;
            this.loading = false;
            observer.next(sales.results);
            observer.complete();
          }
          if (sales.meta.totalResults === 0) {
            this.totalNbResults = sales.meta.totalResults;
            this.noResult = true;
          }
          if (this.currentPage - 1 === sales.meta.totalPages) {
            this.noMoreResults = true;
          }
        }
      );
    });
  }

  public loadMoreHandle(): void {
    this.getSales().subscribe(
      (res: any) => {
        this.sales = this.sales.concat(res);
      }
    );
  }
}
