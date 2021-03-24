import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class GeoRequestService {

  constructor(
    private request: RequestService
  ) { }

  public getGps(zipcode: string): Observable<any> {
    return this.request.getData(this.request.uri.GET_GPS, [zipcode]);
  }
}
