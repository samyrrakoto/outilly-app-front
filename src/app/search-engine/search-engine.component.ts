import { AlgoliaManagerService } from 'src/app/services/algolia-manager.service';
import { Address } from 'src/app/models/address';
import { GeoService, GeoSearch } from 'src/app/services/geo.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent extends GenericComponent implements OnInit {
  @Input() placeholder: string = 'Rechercher un produit';
  @Input() filters: any;
  @ViewChild('state') state: ElementRef;
  counter: number;
  test: any;
  config: any;
  initialQuery: string = '';
  currentZipcode: string = '';
  geo: GeoSearch = new GeoSearch('0', '0', 0);
  searchParams: SearchParams = {
    query: '',
    hitsPerPage: 15,
    filters: '',
    page: 0,
    aroundLatLng: '0, 0',
    aroundRadius: 1
  };

  constructor(
    public appcomponent: AppComponent,
    private route: ActivatedRoute,
    private geoService: GeoService,
    private auth: AuthService,
    private userManager: UserManagerService,
    public algoliaManager: AlgoliaManagerService)
  {
    super();
    this.counter = 1;
    this.config = appcomponent.configOutilly;
    this.modals.addModal('mobile-filters');
  }

  ngOnInit(): void {
    this.doOnInit();
    console.log(this.searchParams);

  }

  ngAfterViewInit(): void{

  }

  private async getQuery(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.initialQuery = params['query'];
      }
    });
    this.searchParams.query = this.initialQuery;
  }

  private async doOnInit(): Promise<void> {
    this.getQuery();

    if (this.auth.isLogged()) {
      const address: Address = await this.userManager.getUserAddress();

      if (address && address.zipcode) {
        await this.getGps(address.zipcode);
        this.currentZipcode = address.zipcode;
      }
    }
  }

  private async getGps(zipcode: string): Promise<void> {
    this.geo = await this.geoService.getGps(zipcode);
    this.searchParams.aroundLatLng = this.geo.aroundLatLng;
  }

  public updateGeoLoc(): void {
    if (this.currentZipcode.length === 5) {
      this.getGps(this.currentZipcode);
    }
  }

  public updateDistance(distance: number): void {
    this.searchParams.aroundRadius = this.geoService.getRadius(distance);
    console.log(this.state.nativeElement.value);
    this.searchParams.query = this.state.nativeElement.value;
    console.log(this.searchParams);
  }

}

type SearchParams = {
  query: string;
  hitsPerPage?: number;
  filters?: string;
  page?: number;
  aroundLatLng?: string;
  aroundRadius?: number;
}
