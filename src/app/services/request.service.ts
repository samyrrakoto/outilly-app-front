import { Injectable } from '@angular/core';
import { Uri } from '../models/uri';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';
import { AccessToken } from '../models/access-token';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response'
  };
  uri: Uri;

  constructor(public http: HttpClient) {
    this.uri = new Uri();
  }

  postData(data: any, ressource: string, param: string): Observable<HttpResponse<any>> {
    this.uri.setUri(ressource, param);

    return this.http.post<any>(this.uri.path, data, this.httpOptions);
  }

  getData(ressource: string, param: string = ''): Observable<any> {
    this.uri.setUri(ressource, param);

    return this.http.get<any>(this.uri.path);
  }

  login(data: any): Observable<HttpResponse<AccessToken>> {
    return this.postData(data, this.uri.LOGIN, '');
  }

  createUser(data: any): Observable<HttpResponse<any>> {
    return this.postData(data, this.uri.USER, this.uri.CREATE);
  }

  checkUsernameExistsCall(data: any): Observable<HttpResponse<any>> {
    return this.postData(data, this.uri.CHECK, this.uri.EXISTS);
  }

  getSaleCall(saleId: string = "1"): Observable<HttpResponse<Sale>> {
    return this.getData(this.uri.SALE, saleId);
  }
}
