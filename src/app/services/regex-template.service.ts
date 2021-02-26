import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexTemplateService {
  readonly NAME: RegExp = /^[a-zA-Zéèêîôû'\- ]+$/;
  readonly COMPANY_NAME: RegExp = /^[a-zA-Zéèêîôû0-9'\- ]+$/;
  readonly PHONE: RegExp = /^((00|\+)33|0)[0-9][0-9]{8}$/;
  readonly ZIPCODE: RegExp = /^[0-9]{4,5}$/;
  readonly SIRET: RegExp = /^[0-9]{14}$/;
  readonly TVA: any = {
    FRANCE: /^[A-Z0-9]{2}[0-9]{9}$/,
    BELGIUM: /^0{1}[0-9]{9}$/,
    SWITZERLAND: /^CHE(-| )([0-9]{3}.){2}[0-9]{3}( )?(MWST|TVA|IVA)$/,
    LUXEMBOURG : /^[0-9]{8}$/
  };

  public validVatRegex(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const verifications: boolean = this.checkVatRegex(control.value);
        return verifications ? null : {notCorrect: control.value};
      }
  }

  private checkVatRegex(value: any): boolean {
    const allRegex: RegExp[] = [
      this.TVA.FRANCE,
      this.TVA.BELGIUM,
      this.TVA.SWITZERLAND,
      this.TVA.LUXEMBOURG
    ];

    if (value !== '') {
      for (const regex of allRegex) {
        if (value.match(regex)) {
          return true;
        }
      }
      return false;
    }
    return true;
  }
}
