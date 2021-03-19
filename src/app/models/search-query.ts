import { ElementRef } from "@angular/core";
import { GeoSearch, GeoService } from "src/app/services/geo.service";

export class SearchQuery {
  searchParams: SearchParams;
  filters: Filters = new Filters();
  geo: GeoSearch = new GeoSearch('0', '0', 0);
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
      aroundRadius: 1
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
      this.searchParams.aroundLatLng = '';
    }
  }

  public updateDistance(distance: number, state: ElementRef): void {
    this.searchParams.aroundRadius = this.geoService.getRadius(distance);
    this.searchParams.query = state.nativeElement.value;
  }

  public updateSlider(value: number): void {
    this.slider = value;
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

  public updateSearch(): void {
    this.searchParams.filters = this.filters.getAll();
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

  public getAll(): string {
    let request = this.constructFilters();
    console.log(request);
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

  private getFiltersName(): string[] {
    let properties: string[] = [];

    for (const prop in this) {
      properties.push(prop);
    }
    return properties;
  }

  private constructFilters(): string {
    let first: boolean = true;
    let filters: string = '';

    for (let filter of this.getFiltersName()) {
      if (first && this[filter].length > 0) {
        filters += this.constructFilter(filter);
        first = false;
      }
      else if (this[filter].length > 0) {
        filters += ' AND ' + this.constructFilter(filter);
      }
    }
    return filters;
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

  public constructFilter(filterName: string): string {
    let first: boolean = true;
    let filter: string = '';

    for (const element of this[filterName]) {
      if (first) {
        filter += filterName + ':' + "\"" + element + "\"";
        first = false;
      }
      else {
        filter += ' OR ' + filterName + ':' + "\"" + element + "\"";
      }
    }
    return filter;
  }
}
