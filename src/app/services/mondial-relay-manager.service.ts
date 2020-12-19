import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MondialRelayManagerService {

  constructor(
    private request: RequestService
  ) { }

  public getMondialRelayCosts(weight: number, origin: string = 'FR', destination: string = 'FR') : Observable<HttpResponse<any>> {
    return this.request.getData(this.request.uri.MONDIAL_RELAY_COSTS, [origin, destination, weight.toString()]);
  }
}
