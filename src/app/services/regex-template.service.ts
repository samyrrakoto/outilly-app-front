import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexTemplateService {
  readonly PHONE: RegExp = /^0{1}[12345679]{1}[0-9]{8}$/;
  readonly LINE1: RegExp = /^$/;
  readonly ZIPCODE: RegExp = /^[0-9]{4,5}$/;
}
