import { GeoRequestService } from './geo-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(
    private geoRequest: GeoRequestService
  ) { }

  public async getGps(zipcode: string): Promise<GeoSearch> {
    return new Promise((resolve, reject) => {
      this.geoRequest.getGps(zipcode).subscribe({
        next: (res: any) => {
          resolve(new GeoSearch(res.latitude, res.longitude));
        },
        error: () => reject()
      });
    });
  }

  public getRadius(radius: number, unity: 'km' | 'm' = 'm'): number {
    if (radius === 0) {
      return 1;
    }
    else {
      return unity === 'm' ? radius * 1000 : radius;
    }
  }
}

export class GeoSearch {
  aroundLatLng: string = '';
  aroundRadius: number = 1;
  aroundPrecision: number = 0;

  constructor(latitude: string, longitude: string, radius?: number) {
    this.setLatLng(latitude, longitude);
    this.aroundRadius = radius;
  }

  public setLatLng(latitude: string, longitude: string): void {
    this.aroundLatLng = latitude + ', ' + longitude;
  }

  public setRadius(radius: number, unity: 'km' | 'm' = 'm'): void {
    this.aroundRadius = unity === 'm' ? radius * 1000 : radius;
  }
}
