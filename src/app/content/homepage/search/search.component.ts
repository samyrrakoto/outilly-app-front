import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  filters: any[];
  references: any[];

  constructor(private request: RequestService) {
    this.allCategories = [];
    this.allTypes = [];
    this.decreasingPrice = false;
    this.filters = [];
    this.references = [];
  }

  ngOnInit(): void {
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

  private hasFilter(type: string, value: string): boolean {
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
    return categoryIds;
  }

  private getReferencesPayload(): any {
    let payload: HttpParams = new HttpParams();

    payload = this.hasFilter('category', 'Consommable') ? payload.append('isConsumable', '1') : payload.append('isConsumable', '0');
    return payload;
  }

  public getReferences(): Promise<any> {
    const payload: HttpParams = this.getReferencesPayload();
    const requestName: string = this.request.uri.REFERENCES + '/' + this.getCategoryIds('category') + '?' + payload.toString();

    return new Promise((resolve) => {
      this.request.getData(requestName).subscribe(
        (references: any) => {
          this.references = references;
          this.references.sort((a, b) => this.compare(a, b, 'label'));
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
