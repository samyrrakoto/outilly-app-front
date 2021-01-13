import { SearchManagerService } from 'src/app/services/search-manager.service';
import { ArrayToolbox } from 'src/app/models/array-toolbox';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() sales: any[];
  @Input() filtersNb: number;
  @Output() loadMoreEmitter: EventEmitter<number> = new EventEmitter<number>();
  arrayToolbox: ArrayToolbox = new ArrayToolbox();
  loaded: boolean = false;
  results: any[];
  randomPage: number[];
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
  readonly categoryTitle: string[] = ['Mécanique', 'Bricolage', 'Jardin', 'Atelier'];
  readonly categoryIcons: string[] = ['wrench', 'hammer', 'seedling', 'warehouse'];

  constructor(
    private request: RequestService,
    public searchManager: SearchManagerService)
  {
    this.sales = [];
    this.currentPage = 1;
    this.mecanicPage = 1;
    this.diyPage = 1;
    this.gardenPage = 1;
    this.workshopPage = 1;
    this.randomPage = this.arrayToolbox.generateNumberArray(5);
  }

  ngOnInit(): void {
    this.filtersNb = 0;
    this.mecanicProducts = this.getProductsByCategory('1');
    this.diyProducts = this.getProductsByCategory('2');
    this.gardenProducts = this.getProductsByCategory('3');
    this.workshopProducts = this.getProductsByCategory('4');
    this.loaded = true;
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
        return 'garden';
      case '4':
        return 'workshop';
    }
  }

  private getRandomPage(): number {
    const randomIndex: number = Math.floor(Math.random() * this.randomPage.length);
    const randomPage: number = this.randomPage[randomIndex];

    this.randomPage.splice(randomIndex, 1);
    return randomPage;
  }

  public getProductsByCategory(categoryId: string): Observable<any> {
    const categoryName: string = this.getCategoryName(categoryId);

    return new Observable((observer) => {
      const nbResults: number = this[categoryName + 'Page'] * this.resultsPerPage;
      const getParams: string = '?categories=' + categoryId + '&page=' + this.getRandomPage();

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
