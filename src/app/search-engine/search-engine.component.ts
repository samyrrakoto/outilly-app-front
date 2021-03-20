import { toolsAndMachines } from 'src/app/parameters';
import { SearchQuery } from 'src/app/models/search-query';
import { AlgoliaManagerService } from 'src/app/services/algolia-manager.service';
import { Address } from 'src/app/models/address';
import { GeoService } from 'src/app/services/geo.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserManagerService } from 'src/app/services/user-manager.service';
import { GenericComponent } from 'src/app/models/generic-component';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent extends GenericComponent implements OnInit {
  @ViewChild('stateInput') stateInput: ElementRef;
  @ViewChild('matSlider') matSlider: ElementRef;
  @Input() placeholder: string = 'Rechercher un produit';
  @Input() filters: any;
  readonly toolsAndMachines: string[] = toolsAndMachines;
  config: any;
  searchQuery: SearchQuery = new SearchQuery(this.geoService);
  searchQueryTmp: SearchQuery = new SearchQuery(this.geoService);
  zipcode: string = '';
  loaded: boolean = false;

  constructor(
    public appcomponent: AppComponent,
    private route: ActivatedRoute,
    private geoService: GeoService,
    private auth: AuthService,
    private userManager: UserManagerService,
    public algoliaManager: AlgoliaManagerService)
  {
    super();
    this.config = appcomponent.configOutilly;
    this.modals.addModal('mobile-filters');
  }

  ngOnInit(): void {
    this.doOnInit();
  }

  private async doOnInit(): Promise<void> {
    this.getQuery();
    await this.getGeoLoc();
    this.loaded = true;
  }

  private async getGeoLoc(): Promise<void> {
    if (this.zipcode) {
      await this.searchQuery.getGps(this.zipcode);
      this.searchQuery.zipcode = this.zipcode;
    }
    else {
      if (this.auth.isLogged()) {
        const address: Address = await this.userManager.getUserAddress();

        if (address && address.zipcode) {
          await this.searchQuery.getGps(address.zipcode);
          this.searchQuery.zipcode = address.zipcode;
        }
      }
    }
  }

  private async getQuery(): Promise<void> {
    this.route.queryParams.subscribe((params: any) => {
      this.searchQuery.searchParams.query = params['query'] ? params['query'] : '';
      this.zipcode = params['zipcode'] ? params['zipcode'] : '';
      params['filters'] ? this.searchQuery.getFiltersParams(params['filters']) : null;

      if (params['radius']) {
        this.searchQuery.updateDistance(params['radius']);
        this.searchQuery.geo.aroundRadius = +params['radius'];
      }
    });
  }
}
