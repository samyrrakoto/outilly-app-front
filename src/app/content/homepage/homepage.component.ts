import { QueryParamService } from 'src/app/services/query-param.service';
import { MetaDataService } from 'src/app/services/meta-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { PageNameManager } from 'src/app/models/page-name-manager';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cookieValue: string;
  allCategories: any[];
  allTypes: any[];
  decreasingPrice: boolean;
  sales: any[];
  filtersNb: number;
  loadMore: number;
  loading: boolean = false;
  logged: boolean = false;
  pageNameManager: PageNameManager = new PageNameManager(this.title);
  readonly pageTitle: string = "Matériel de bricolage d'occasion - Achat et revente - Outillage, équipement et fin de chantier";

  constructor(
    private request: RequestService,
    private title: Title,
    private auth: AuthService,
    private meta: MetaDataService,
    private queryParam: QueryParamService)
  {
    this.allCategories = [];
    this.allTypes = [];
    this.decreasingPrice = false;
    this.sales = [];
    this.loadMore = 0;
  }

  ngOnInit(): void {
    this.meta.updateTags(this.pageTitle, 'Faites de la place, Revendez votre matériel. Sur Outilly, achetez et revendez du matériel de seconde main en toute sécurité.', '', 'outilly-share-base.jpg');
    this.auth.getLogStatus()
      .then(() => this.connectionStatus())
      .then(() => this.getCategories())
      .then(() => this.getTypes())
      .then(() => {});
  }

  public getFilters(filters: any[]): void {
    this.filtersNb = filters.length;
  }

  private connectionStatus(): Promise<void> {
    return new Promise((resolve) => {
      if (this.auth.accessToken === 'good' && this.auth.logged) {
        this.logged = true;
      }
      resolve();
    });
  }

  private getCategories(): Promise<void> {
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

  private getTypes(): Promise<void> {
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
  public getSales(sales: any): void {
    this.sales = sales.results;
  }

  public getLoadMore(loadMore: number): void {
    this.loadMore = loadMore;
  }

  public getLoadingState(loadingState: boolean): void {
    this.loading = loadingState;
  }
}
