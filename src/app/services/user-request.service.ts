import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(
    private request: RequestService
  ) { }

  public getValidationStatus(): Observable<any> {
    return this.request.getData(this.request.uri.KYC_VALIDATION_STATUS);
  }
}
