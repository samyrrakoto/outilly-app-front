import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexTemplateService {
  readonly PHONE: RegExp = /^((00|\+)33|0)[0-9][0-9]{8}$/;
  readonly ZIPCODE: RegExp = /^[0-9]{4,5}$/;
  readonly SIRET: RegExp = /^[0-9]{14}$/;
  readonly TVA: any = {
    FRANCE: /^[A-Z0-9]{2}[0-9]{9}$/,
    BELGIUM: /^0{1}[0-9]{9}$/,
    SWITZERLAND: /^CHE(-| )([0-9]{3}.){2}[0-9]{3}( )?(MWST|TVA|IVA)$/,
    LUXEMBOURG : /^[0-9]{8}$/
  };
}
