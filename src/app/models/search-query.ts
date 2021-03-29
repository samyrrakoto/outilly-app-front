import { ElementRef } from "@angular/core";
import { GeoSearch, GeoService } from "src/app/services/geo.service";
import { filterAliases } from "src/app/parameters";

export class SearchQuery {
  searchParams: SearchParams;
  filters: Filters = new Filters();
  geo: GeoSearch = new GeoSearch('0', '0', 200);
  zipcode: string = '';
  slider: number = 0;

  constructor(
    private geoService: GeoService
  )
  {
    this.searchParams = {
      query: '',
      hitsPerPage: 15,
      filters: '',
      page: 0,
      aroundLatLng: '0, 0',
      aroundRadius: 20
    };
  }

  public copy(searchQuery: SearchQuery): void {
    this.searchParams.query = searchQuery.searchParams.query;
    this.geo.aroundRadius = searchQuery.geo.aroundRadius;
    this.zipcode = searchQuery.zipcode;
    this.searchParams.aroundLatLng = searchQuery.searchParams.aroundLatLng;
    this.searchParams.aroundRadius = searchQuery.searchParams.aroundRadius;
    this.searchParams.filters = searchQuery.searchParams.filters;
    this.slider = searchQuery.slider;
    this.filters.copy(searchQuery.filters);
  }

  public async getGps(zipcode: string): Promise<void> {
    const geo: GeoSearch = await this.geoService.getGps(zipcode);

    this.searchParams.aroundLatLng = geo.aroundLatLng;
  }

  public updateGeoLoc(zipcode: string): void {
    if (zipcode.length === 5) {
      this.getGps(zipcode);
    }
    else if (zipcode.length === 0) {
      this.resetGeoLoc();
    }
  }

  public resetGeoLoc(): void {
    this.searchParams.aroundLatLng = '';
  }

  public updateDistance(distance: number): void {
    this.searchParams.aroundRadius = this.geoService.getRadius(distance);
  }

  public updateQuery(state: ElementRef): void {
    this.searchParams.query = state.nativeElement.value;
  }

  public updateSlider(value: number): void {
    this.slider = value;
  }

  public cleanParams(): void {
    this.filters.clean();
    this.zipcode = '';
    this.searchParams = {
      query: '',
      hitsPerPage: 15,
      filters: '',
      page: 0,
      aroundLatLng: '0, 0',
      aroundRadius: 20
    };
    this.resetGeoLoc();
  }

  public setFilter(filterName: string, value: string): void {
    if (this.filters.hasFilter(filterName, value)) {
      this.filters.remove(filterName, value);
    }
    else {
      this.filters.add(filterName, value);
    }
    this.updateSearch();
  }

  public setFilters(filterName: string, values: string[]): void {
    for (const value of values) {
      this.setFilter(filterName, value);
    }
  }

  public resetFilter(filterName: string): void {
    this.filters.resetFilter(filterName);
  }

  public updateSearch(): void {
    if (this.searchParams.aroundRadius === 0) {
      delete this.searchParams.aroundRadius;
    }
    this.searchParams.filters = this.filters.getAll();
  }

  public getFiltersParams(param: string): void {
    const myParams: string[] = this.parseUrlParams(param);
    const filters: Filter[] = this.getFilters(myParams);

    for (const filter of filters) {
      this.setFilter(filter.name, filter.value);
    }
  }

  private parseUrlParams(urlParams: string): string[] {
    let params: string[] = [];

    params = urlParams.split(' ');
    return params;
  }

  private getFilters(params: string[]): Filter[] {
    const filters: Filter[] = [];

    for (const param of params) {
      if (param !== 'OR' && param !=='AND') {
        const currentFilter: Filter = {
          name: param.split(':')[0],
          value: this.mapParamAlias(param.split(':')[1].replace(/"/g, ''))
        };
        filters.push(currentFilter);
      }
    }
    return filters;
  }

  private mapParamAlias(param: string): string {
    for (const alias of filterAliases) {
      if (param === alias.alias) {
        return alias.name;
      }
    }
    return param;
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

class Filters {
  brands: string[] = [];
  quality: string[] = [];
  types: string[] = [];
  categories: string[] = [];
  to_deliver: string[] = [];

  public getAll(alias: boolean = false): string {
    let request = this.constructFilters(alias);
    return request;
  }

  public copy(filters: Filters): void {
    this.brands = filters.brands;
    this.quality = filters.quality;
    this.types = filters.types;
    this.categories = filters.categories;
    this.to_deliver = filters.to_deliver;
  }

  public hasFilter(filterName: string, value: string): boolean {
    for (const filter of this[filterName]) {
      if (filter === value) {
        return true;
      }
    }
    return false;
  }

  public hasFilters(filterName: string, values: string[]): boolean {
    for (const value of values) {
      if (!this[filterName].includes(value)) {
        return false;
      }
    }
    return true;
  }

  public resetFilter(filterName: string): void {
    if (this[filterName]) {
      this[filterName] = [];
    }
  }

  private getFiltersName(): string[] {
    let properties: string[] = [];

    for (const prop in this) {
      properties.push(prop);
    }
    return properties;
  }

  private constructFilters(alias: boolean = false): string {
    let first: boolean = true;
    let filters: string = '';

    for (let filter of this.getFiltersName()) {
      if (first && this[filter].length > 0) {
        filters += this.constructFilter(filter, alias);
        first = false;
      }
      else if (this[filter].length > 0) {
        filters += ' AND ' + this.constructFilter(filter);
      }
    }
    return filters;
  }

  public clean(): void {
    for (const filter of this.getFiltersName()) {
      this[filter] = [];
    }
  }

  public add(filterName: string, value: string): void {
    if (!this.hasFilter(filterName, value)) {
      this[filterName].push(value);
    }
  }

  public remove(filterName: string, value: string): void {
    for (let i = 0; i < this[filterName].length; i++) {
      if (this[filterName][i] === value) {
        this[filterName].splice(i, 1);
      }
    }
  }

  public constructFilter(filterName: string, alias: boolean = false): string {
    let first: boolean = true;
    let filter: string = '';

    for (const element of this[filterName]) {
      if (first) {
        if (alias) filter += filterName + ':' + "\"" + this.mapParamName(element) + "\"";
        else filter += filterName + ':' + "\"" + element + "\"";
        first = false;
      }
      else {
        if (alias) filter += ' OR ' + filterName + ':' + "\"" + this.mapParamName(element) + "\"";
        else filter += ' OR ' + filterName + ':' + "\"" + element + "\"";
      }
    }
    return filter;
  }

  private mapParamName(param: string): string {
    for (const alias of filterAliases) {
      if (param === alias.name) {
        return alias.alias;
      }
    }
    return param;
  }
}

export type Filter = {
  name: string;
  value: string;
}
