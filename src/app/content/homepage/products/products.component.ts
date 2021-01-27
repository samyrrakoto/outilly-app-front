import { CategoryService } from 'src/app/services/category.service';
import { productDisplay } from 'src/app/parameters';
import { ArrayToolbox } from 'src/app/models/array-toolbox';
import { environment } from 'src/environments/environment';
import { Component, Input, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() sales: any[];
  @Input() filtersNb: number;
  @Input() loading: boolean = false;
  @Output() loadMoreEmitter: EventEmitter<number> = new EventEmitter<number>();
  arrayToolbox: ArrayToolbox = new ArrayToolbox();
  loaded: boolean = false;
  results: any[];
  noMoreResults: boolean = false;
  randomPage: number[];
  currentPage: number;
  mecanicPage: number;
  gardenPage: number;
  diyPage: number;
  workshopPage: number;
  mecanicProducts: any[] = [];
  gardenProducts: any[] = [];
  diyProducts: any[] = [];
  workshopProducts: any[] = [];
  readonly resultsPerPage: number = productDisplay.NB_RESULTS;
  readonly mediaBaseUri: string = environment.mediaBaseUri;
  readonly maxTitleSize: number = 42;
  readonly categoryTitle: string[] = ['Mécanique', 'Bricolage', 'Jardin', 'Atelier'];
  readonly categoryIcons: string[] = ['wrench', 'hammer', 'seedling', 'warehouse'];

  constructor(
    private request: RequestService,
    public categoryService: CategoryService)
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
    this.getProductsByCategory(1)
      .then(() => this.getProductsByCategory(2))
      .then(() => this.getProductsByCategory(3))
      .then(() => this.getProductsByCategory(4))
      .then(() => this.loaded = true);
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

  private getCategoryName(categoryId: number): string {
    switch(categoryId) {
      case 1:
        return 'mecanic';
      case 2:
        return 'diy';
      case 3:
        return 'garden';
      case 4:
        return 'workshop';
    }
  }

  public getProductsByCategory(categoryId: number): Promise<void> {
    const categoryName: string = this.getCategoryName(categoryId);

    return new Promise((resolve) => {
      const getParams: string = '?categories=' + categoryId;

      this.request.getData(this.request.uri.SALES + getParams).subscribe(
        (sales: any) => {
          this[categoryName + 'Products'] = sales.results;
          if (this.currentPage - 1 === sales.meta.totalPages) {
            this.noMoreResults = true;
          }
          resolve();
        }
      )
    });
  }
}
