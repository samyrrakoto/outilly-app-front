import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexTemplateService {
  readonly PHONE: RegExp = /^((00|\+)33|0)[0-9][0-9]{8}$/;
  readonly ZIPCODE: RegExp = /^[0-9]{4,5}$/;
  readonly SIRET: RegExp = /^[0-9]{14}$/;
  readonly TVA_FRANCE: RegExp = /^[A-Z0-9]{2}[0-9]{9}$/;
  readonly TVA_BELGIUM: RegExp = /^0{1}[0-9]{9}$/;
  readonly TVA: RegExp = null;
}
