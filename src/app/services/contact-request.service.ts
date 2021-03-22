import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ContactRequestService {

  constructor(
    private request: RequestService
  ) { }

  public sendMessage(payload: any): Observable<any> {
    return this.request.postData(payload, this.request.uri.SEND_CONTACT_REQUEST);
  }
}
