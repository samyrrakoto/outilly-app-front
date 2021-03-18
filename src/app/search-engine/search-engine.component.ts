import { SearchQuery } from 'src/app/models/search-query';
import { AlgoliaManagerService } from 'src/app/services/algolia-manager.service';
import { Address } from 'src/app/models/address';
import { GeoService, GeoSearch } from 'src/app/services/geo.service';
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
  @Input() placeholder: string = 'Rechercher un produit';
  @Input() filters: any;
  @ViewChild('state') state: ElementRef;
  config: any;
  searchQuery: SearchQuery = new SearchQuery(this.geoService);
  searchQueryTmp: SearchQuery = new SearchQuery(this.geoService);

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

  private async getQuery(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.searchQuery.searchParams.query = params['query'];
      }
    });
  }

  private async doOnInit(): Promise<void> {
    this.getQuery();

    if (this.auth.isLogged()) {
      const address: Address = await this.userManager.getUserAddress();

      if (address && address.zipcode) {
        await this.searchQuery.getGps(address.zipcode);
        this.searchQuery.zipcode = address.zipcode;
      }
    }
  }
}
