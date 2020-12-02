import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() sales: any;
  @Input() filtersNb: number;
  @Output() loadMoreEmitter: EventEmitter<number> = new EventEmitter<number>();
  results: any[];
  currentPage: number;
  mecanicPage: number;
  gardenPage: number;
  diyPage: number;
  workshopPage: number;
  mecanicProducts: Observable<any[]>;
  gardenProducts: Observable<any[]>;
  diyProducts: Observable<any[]>;
  workshopProducts: Observable<any[]>;
  readonly resultsPerPage: number = 5;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly maxTitleSize: number = 42;

  constructor(private request: RequestService) {
    this.sales = [];
    this.currentPage = 1;
    this.mecanicPage = 1;
    this.diyPage = 1;
    this.gardenPage = 1;
    this.workshopPage = 1;
  }

  ngOnInit(): void {
    this.filtersNb = 0;
    this.mecanicProducts = this.getProductsByCategory('1');
    this.diyProducts = this.getProductsByCategory('2');
    this.workshopProducts = this.getProductsByCategory('3');
    this.gardenProducts = this.getProductsByCategory('4');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sales && changes.sales.currentValue) {
      this.results = changes.sales.currentValue.results;
    }
  }

  public sendLoadMore(): void {
    this.loadMoreEmitter.emit(this.currentPage);
    this.currentPage++;
  }

  private getCategoryName(categoryId: string): string {
    switch(categoryId) {
      case '1':
        return 'mecanic';
      case '2':
        return 'diy';
      case '3':
        return 'workshop';
      case '4':
        return 'garden';
    }
  }

  public getProductsByCategory(categoryId: string): Observable<any> {
    const categoryName: string = this.getCategoryName(categoryId);

    return new Observable((observer) => {
      const nbResults: number = this[categoryName + 'Page'] * this.resultsPerPage;
      const getParams: string = '?categories=' + categoryId + '&resultsPerPage=' + nbResults.toString();

      this.request.getData(this.request.uri.SALES + getParams).subscribe(
        (sales: any) => {

          observer.next(sales.results);
          observer.complete();
          this[categoryName + 'Page']++;
        }
      )
    });
  }

  public loadMoreCategory(categoryId: string): void {
    const categoryName: string = this.getCategoryName(categoryId);

    this[categoryName + 'Products'] = this.getProductsByCategory(categoryId);
  }
}
