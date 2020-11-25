import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  allCategories: any[];
  allTypes: any[];
  decreasingPrice: boolean;
  sales: any;
  loadMore: number;

  constructor(private request: RequestService) {
    this.allCategories = [];
    this.allTypes = [];
    this.decreasingPrice = false;
    this.sales = null;
    this.loadMore = 0;
  }

  ngOnInit(): void {
    this.getCategories()
      .then(() => this.getTypes())
      .then(() => {});
  }

  private getCategories(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.CATEGORIES).subscribe(
        (categories: any) => {
          this.allCategories = categories;
          this.allCategories.push({'label':'Consommable'})
          this.allCategories.sort((a, b) => this.compare(a, b, 'label'));
          resolve();
        }
      );
    });
  }

  private getTypes(): Promise<any> {
    return new Promise((resolve) => {
      this.request.getData(this.request.uri.TYPES).subscribe(
        (types: any) => {
          this.allTypes = types;
          this.allTypes.splice(6, 1);
          this.allTypes.sort((a, b) => this.compare(a, b, 'label'));
          resolve();
        }
      );
    });
  }

  private compare(a: any, b: any, field: string): number {
    return a[field] < b[field] ? -1 : 1;
  }

  // Output Getters
  public getSales(sales: any) {
    this.sales = sales;
  }

  public getLoadMore(loadMore: number) {
    this.loadMore = loadMore;
  }
}
