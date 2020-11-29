import { Uri } from 'src/app/models/uri';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  postData(data: any, ressource: string, params: Array<string>=[], options=this.httpOptions): Observable<HttpResponse<any>> {
    this.uri.setUri(ressource, params);

    return options === null ? this.http.post<any>(this.uri.path, data) : this.http.post<any>(this.uri.path, data, options);
  }

  patchData(data: any, ressource: string, params: Array<string>=[], options=this.httpOptions): Observable<HttpResponse<any>> {
    this.uri.setUri(ressource, params);

    return options === null ? this.http.patch<any>(this.uri.path, data) : this.http.patch<any>(this.uri.path, data, options);
  }

  getData(ressource: string, params: Array<string> = []): Observable<any> {
    this.uri.setUri(ressource, params);

    return this.http.get<any>(this.uri.path);
  }

  putData(ressource: string, data: any, params: Array<string> = []): Observable<any> {
    this.uri.setUri(ressource, params);

    return this.http.put<any>(this.uri.path, data)
  }

  deleteData(ressource: string, data: any, params: Array<string> = []): Observable<any> {
    this.uri.setUri(ressource, params);

    return data === null ? this.http.delete<any>(this.uri.path) : this.http.delete<any>(this.uri.path, data);
  }

  login(data: any): Observable<HttpResponse<AccessToken>> {
    return this.postData(data, this.uri.LOGIN, []);
  }

  createUser(data: any): Observable<HttpResponse<any>> {
    return this.postData(data, this.uri.USER, [this.uri.CREATE]);
  }

  checkUsernameExistsCall(data: any): Observable<HttpResponse<any>> {
    return this.postData(data, this.uri.CHECK, [this.uri.EXISTS]);
  }

  getSaleCall(saleId: string = "1"): any {
    return this.getData(this.uri.SALE, [saleId]);
  }

  getUserInfos(): any {
    return this.getData(this.uri.SECURE + this.uri.USER);
  }

  updateProduct(data: any): Observable<HttpResponse<any>>{
    return this.patchData(data, this.uri.PRODUCT_UPDATE);
  }

  createSale(data: any): Observable<HttpResponse<any>>{
    return this.postData(data, this.uri.SALE_CREATE);
  }

  uploadMedia(data: any): Observable<HttpResponse<any>>{
    return this.postData(data, this.uri.PRODUCT_MEDIA_CREATE, [], null);
  }

  updateUser(data: any): Observable<HttpResponse<any>> {
    return this.putData(this.uri.UPDATE_USER, data);
  }

  getPreauthData(preAuthId: any): Observable<any> {
    return this.getData(this.uri.GET_PREAUTH_DATA + '?preAuthorizationId=' + preAuthId);
  }
}
