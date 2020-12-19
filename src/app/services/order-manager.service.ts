import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

  constructor(
    private request: RequestService
  ) { }

  public getOrderById(orderId: number): Observable<HttpResponse<any>> {
    return this.request.getData(this.request.uri.GET_ORDER, [orderId.toString()]);
  }
}
