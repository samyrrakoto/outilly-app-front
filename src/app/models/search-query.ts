import { ElementRef } from "@angular/core";
import { GeoSearch, GeoService } from "src/app/services/geo.service";

export class SearchQuery {
  searchParams: SearchParams;
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

  public copy(searchQuery2: SearchQuery): void {
    this.searchParams.query = searchQuery2.searchParams.query;
    this.geo.aroundRadius = searchQuery2.geo.aroundRadius;
    this.zipcode = searchQuery2.zipcode;
    this.searchParams.aroundLatLng = searchQuery2.searchParams.aroundLatLng;
    this.searchParams.aroundRadius = searchQuery2.searchParams.aroundRadius;
    this.searchParams.filters = searchQuery2.searchParams.filters;
    this.slider = searchQuery2.slider;
  }

  public async getGps(zipcode: string): Promise<void> {
    const geo: GeoSearch = await this.geoService.getGps(zipcode);

    this.searchParams.aroundLatLng = geo.aroundLatLng;
  }

  public updateGeoLoc(zipcode: string): void {
    if (zipcode.length === 5) {
      this.getGps(zipcode);
    }
  }

  public updateDistance(distance: number, state: ElementRef): void {
    this.searchParams.aroundRadius = this.geoService.getRadius(distance);
    this.searchParams.query = state.nativeElement.value;
  }

  public updateSlider(value: number): void {
    this.slider = value;
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
