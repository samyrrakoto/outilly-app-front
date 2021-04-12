import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class EstimationRequestService {

  constructor(
    private request: RequestService
  ) { }

  public estimate(payload: any): Observable<any> {
    return this.request.postData(payload, this.request.uri.PRODUCT_ESTIMATE);
  }
}
