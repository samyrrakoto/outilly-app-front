import { Injectable } from '@angular/core';
import { Uri } from '../models/uri';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

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

  postData(data: any, ressource: string, param: string): Observable<HttpResponse<User>> {
    this.uri.setUri(ressource, param);

    return this.http.post<any>(this.uri.path, data, this.httpOptions);
  }

  createUser(data: any): Observable<HttpResponse<User>> {
    return this.postData(data, this.uri.USER, this.uri.CREATE);
  }

  checkUsernameExists(data: any): Observable<HttpResponse<User>> {
    return this.postData(data, this.uri.CHECK, this.uri.EXISTS);
  }
}
