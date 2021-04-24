import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class OrderRequestService {

  constructor(
    private request: RequestService
  ) { }

  public getOrderById(orderId: number): Observable<any> {
    return this.request.getData(this.request.uri.GET_ORDER, [orderId.toString()]);
  }

  public getSellerOrders(): Observable<any> {
    return this.request.getData(this.request.uri.GET_SELLER_ORDERS);
  }

  public confirmAvailability(orderId: number): Observable<any> {
    const url: string = this.request.uri.ORDER_VALIDITY_CONFIRMATION + '/' + orderId;

    return this.request.putData(url, null);
  }

  public checkBuyerCode(orderId: number, typedCode: string): Observable<any> {
    return this.request.getData(this.request.uri.CHECK_BUYER_CODE, [orderId.toString(), typedCode]);
  }

  public sendOrder(orderId: number): Observable<any> {
    return this.request.patchData(null, this.request.uri.SEND_ORDER + '/' + orderId.toString());
  }
}
