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

  ngOnInit(): void {}

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

  private getReferences(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.REFERENCES).subscribe(
        (references: any) => {
          this.references = references;
        }
      );
    });
  }
}
