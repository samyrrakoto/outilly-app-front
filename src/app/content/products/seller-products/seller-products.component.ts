import { Sale } from 'src/app/models/sale';
import { Observable } from 'rxjs';
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
  noMoreResults: boolean = false;
  readonly resultsPerPage: number = 15;

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
  )
  { }

  ngOnInit(): void {
    this.getSellerId()
      .then(() => this.getSales().subscribe(
        (res: any) => {
          this.sales = res
          this.loaded = true;
        }
      ));
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
