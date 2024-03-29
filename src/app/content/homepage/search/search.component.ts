import { productDisplay } from 'src/app/parameters';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() allCategories: any[];
  @Input() allTypes: any[];
  @Input() decreasingPrice: boolean;
  @Input() loadMore: number;
  @Output() salesEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() filtersEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() loadingEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading: boolean = false;
  filters: any[];
  references: any[];
  sales: any;
  currentPage: number = 1;
  readonly resultsPerPage: number = productDisplay.NB_RESULTS;

  constructor(private request: RequestService) {
    this.allCategories = [];
    this.allTypes = [];
    this.decreasingPrice = false;
    this.filters = [];
    this.references = [];
    this.sales = {'results': [], 'meta': {}};
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadMore && changes.loadMore.currentValue) {
      if (changes.loadMore.currentValue < this.sales.meta.totalPages) {
        this.getSales();
        this.loadMore = 0;
      }
    }
  }

  public addFilter(type: string, value: string): void {
    if (!this.hasFilter(type, value)) {
      if (type === 'decreasingPrice' && value === 'Non') {
        this.removeFilter(type, 'Oui');
      }
      else {
        this.filters.push({'type': type, 'value': value});
      }
    }
  }

  public removeFilter(type: string, value: string): void {
    let i = 0;

    for (const filter of this.filters) {
      if (filter.type === type && filter.value === value) {
         this.filters.splice(i, 1);
      }
      i++;
    }
  }

  public hasFilter(type: string, value: string): boolean {
    for (const filter of this.filters) {
      if (filter.type === type && filter.value === value) {
        return true;
      }
    }
    return false;
  }

  private getValuesFromType(type: string): string[] {
    const filterValues: string[] = [];

    for (const filter of this.filters) {
      if (filter.type === type) {
        filterValues.push(filter.value);
      }
    }
    return filterValues;
  }

  private getCategoryIds(category: string): string {
    const categoryValues: string[] = this.getValuesFromType('category');
    let categoryIds: string = '';

    for (const categoryValue of categoryValues) {
      for (const category of this.allCategories) {
        if (categoryValue === category.label && categoryValue !== 'Consommable') {
          categoryIds += categoryIds.length > 0 ? '-' : '';
          categoryIds += category.id;
        }
      }
    }
    return categoryIds.length === 0 ? '1-2-3-4' : categoryIds;
  }

  private getTypeIds(type: string): string {
    const typeValues: string[] = this.getValuesFromType('type');
    let typeIds: string = '';

    for (const typeValue of typeValues) {
      for (const type of this.allTypes) {
        if (typeValue === type.label) {
          typeIds += typeIds.length > 0 ? '-' : '';
          typeIds += type.id;
        }
      }
    }
    return typeIds;
  }

  private getReferenceIds(reference: string): string {
    const referenceValues: string[] = this.getValuesFromType('reference');
    let referenceIds: string = '';

    for (const referenceValue of referenceValues) {
      for (const reference of this.references) {
        if (referenceValue === reference.label) {
          referenceIds += referenceIds.length > 0 ? '-' : '';
          referenceIds += reference.id;
        }
      }
    }
    return referenceIds;
  }

  private getReferencesPayload(): HttpParams {
    let payload: HttpParams = new HttpParams();

    payload = this.hasFilter('category', 'Consommable') ? payload.append('isConsumable', '1') : payload.append('isConsumable', '0');
    return payload;
  }

  public getReferences(): Promise<void> {
    const payload: HttpParams = this.getReferencesPayload();
    const requestName: string = this.request.uri.REFERENCES + '/' + this.getCategoryIds('category') + '?' + payload.toString();

    return new Promise((resolve) => {
      this.request.getData(requestName).subscribe(
        (references: any) => {
          this.references = references;
          this.references.sort((a, b) => this.compare(a, b, 'label'));
          resolve();
        }
      );
    });
  }

  private getSalesPayload(): HttpParams {
    let payload: HttpParams = new HttpParams();

    this.getTypeIds('type') !== '' ? payload = payload.append('types', this.getTypeIds('type')) : null;
    this.getCategoryIds('category') !== '' ? payload = payload.append('categories', this.getCategoryIds('category')) : null;
    this.getReferenceIds('reference') !== '' ? payload = payload.append('refs', this.getReferenceIds('reference')) : null;
    this.hasFilter('category', 'Consommable') ? payload = payload.append('isConsumable', '1') : null;
    this.hasFilter('decreasingPrice', 'Oui') ? payload = payload.append('orderBy', 'price') : null;
    payload = payload.append('resultsPerPage', (this.currentPage * this.resultsPerPage).toString());
    return payload;
  }

  public getSales(): Promise<void> {
    const payload: HttpParams = this.getSalesPayload();
    const requestname: string = this.request.uri.SALES + '?' + payload.toString();
    this.loadingEmitter.emit(true);
    this.loading = true;

    return new Promise((resolve) => {
      this.request.getData(requestname).subscribe(
        (sales: any) => {
          this.sales = sales;
          this.salesEmitter.emit(this.sales);
          this.filtersEmitter.emit(this.filters);
          this.currentPage++;
          this.loadingEmitter.emit(false);
          this.loading = false;
          resolve();
        }
      );
    });
  }

  private getFilterValue(filterType: string): string {
    for (const filter of this.filters) {
      if (filter.type === filterType) {
        return filter.value;
      }
    }
  }

  private compare(a: any, b: any, field: string): number {
    return a[field] < b[field] ? -1 : 1;
  }
}
