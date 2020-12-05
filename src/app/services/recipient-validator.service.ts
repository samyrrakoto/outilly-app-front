import { FormConstraintService } from './form-constraint.service';
import { Injectable } from '@angular/core';
import { Recipient } from '../models/recipient';

@Injectable({
  providedIn: 'root'
})
export class RecipientValidatorService {

  constructor(public formConstraints: FormConstraintService) { }

  phoneNumberVerify(data: Recipient): boolean {
    const phoneNumber: string = data.phone;
    const message: string = "Le numéro est invalide";
    const regex: RegExp = /^0{1}[1234567]{1}[0-9]{8}$/;

    if (phoneNumber.match(regex)) {
      this.formConstraints.errorMessageManager.removeErrorMessage(message);
      return true;
    }
    else {
      this.formConstraints.errorMessageManager.addErrorMessage(message);
      return false;
    }
  }

  mailVerify(data: Recipient): boolean {
    const mail: string = data.email;
    const message: string = "L'adresse mail est invalide";
    const regex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (mail.match(regex)) {
      this.formConstraints.errorMessageManager.removeErrorMessage(message);
      return true;
    }
    else {
      this.formConstraints.errorMessageManager.addErrorMessage(message);
      return false;
    }
  }

  /* Constraints manager called by the form */
  verify(data: Recipient, field: string): boolean {
    return this[field + "Verify"](data);
  }
}
