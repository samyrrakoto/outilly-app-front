import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class SaleRequestService {

  constructor(
    private request: RequestService
  ) { }

  public deleteSale(saleId: number): Observable<any> {
    const ressource: string = this.request.uri.DELETE_SALE + '/' + saleId.toString();

    return this.request.deleteData(ressource, null);
  }
}
