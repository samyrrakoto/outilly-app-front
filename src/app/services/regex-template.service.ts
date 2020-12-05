import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexTemplateService {
  readonly PHONE: RegExp = /^((00|\+)33|0)[0-9][0-9]{8}$/;
  readonly ZIPCODE: RegExp = /^[0-9]{4,5}$/;
}
