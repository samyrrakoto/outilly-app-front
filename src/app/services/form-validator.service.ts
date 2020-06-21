import { Injectable } from '@angular/core';
import { FormDataService } from './form-data.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  errorMessages: Array<string>;
  isValid: boolean;

  constructor() {
    this.errorMessages = [];
  }

  /*
  ----- General constraints
  */
  isEmpty(field: string): boolean {
    let message = "Ce champ est requis !";
    let index = this.errorMessages.indexOf(message);

    if (field == "") {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  isEmptyDate(date: Date): boolean {
    let message = "Ce champ est requis !";
    let index = this.errorMessages.indexOf(message);

    if (date == null) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  isEmptyBool(bool: boolean): boolean {
    let message = "Ce champ est requis !";
    let index = this.errorMessages.indexOf(message);

    if (bool == undefined) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  /*
  ----- Username constraints
  */
  isTooShort(username: string): boolean {
    let message = "Le nom d'utilisateur doit faire au moins 4 caractères !";
    let index = this.errorMessages.indexOf(message);

    if (username.length < 4) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  userNameVerify(username: string): boolean {
    if (this.isEmpty(username))
      return false;
    if (this.isTooShort(username))
      return false;
    return true;
  }

  /*
  ----- Email constraints
  */
  emailVerify(email: string): boolean {
    if (this.isEmpty(email))
      return false;
    return true;
  }

  /*
  ----- Email Optin constraints
  */
  emailOptinVerify(emailOptin: boolean): boolean {
    if (this.isEmptyBool(emailOptin))
      return false;
    return true;
  }

  /*
  ----- Firstname constraints
  */

  firstNameVerify(firstName: string): boolean {
    if (this.isEmpty(firstName))
      return false;
    return true;
  }

  /*
  ----- Lastname constraints
  */

  lastNameVerify(lastName: string): boolean {
    if (this.isEmpty(lastName))
      return false;
    return true;
  }

  /*
  ----- Gender constraints
  */
  genderVerify(gender: string): boolean {
    if (this.isEmpty(gender))
      return false;
    return true;
  }

  /*
  ----- Status constraints
  */
  statusVerify(status: string): boolean {
    if (this.isEmpty(status))
      return false;
    return true;
  }

  /*
  ----- Birthdate constraints
  */
  birthdateVerify(birthdate: Date): boolean {
    if (this.isEmptyDate(birthdate))
      return false;
    return true;
  }

  /*
  ----- Country constraints
  */
  countryVerify(country: string): boolean {
    if (this.isEmpty(country))
      return false;
    return true;
  }

  /*
  ----- Zipcode constraints
  */
  zipcodeVerify(zipcode: string): boolean {
    if (this.isEmpty(zipcode))
      return false;
    return true;
  }

  /*
  ----- City constraints
  */
  cityVerify(city: string): boolean {
    if (this.isEmpty(city))
      return false;
    return true;
  }

  /*
  ----- Street constraints
  */
  streetVerify(street: string): boolean {
    if (this.isEmpty(street))
      return false;
    return true;
  }

  /*
  ----- Phone number constraints
  */
  phoneNumberVerify(phoneNumber: string): boolean {
    if (this.isEmpty(phoneNumber))
      return false;
    return true;
  }

  /*
  ----- Password constraints
  */
  pwdVerify(pwd: string): boolean {
    if (this.isEmpty(pwd))
      return false;
    return true;
  }

  /*
  ----- Password Confirmation constraints
  */

  isPwdConfirmationDifferent(pwd: string, pwdConfirmation: string): boolean {
    let message = "Les mots de passe sont différents !";
    let index = this.errorMessages.indexOf(message);

    if (pwd != pwdConfirmation) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  pwdConfirmationVerify(pwd: string, pwdConfirmation: string): boolean {
    if (this.isPwdConfirmationDifferent(pwd, pwdConfirmation))
      return false;
    return true;
  }

  /*
  ----- Siret constraints
  */
  siretVerify(siret: string): boolean {
    if (this.isEmpty(siret))
      return false;
    return true;
  }

  /*
  ----- TVA constraints
  */
  tvaVerify(tva: string): boolean {
    if (this.isEmpty(tva))
      return false;
    return true;
  }

  /*
  ----- Constraints manager called by the form
  */
  verify(data: FormDataService): boolean {
    switch (data.fieldName) {
      case "userName":
        return this.userNameVerify(data.user.username);
      case "email":
        return this.emailVerify(data.user.userProfile.email);
      case "emailOptin":
        return this.emailOptinVerify(data.user.userProfile.emailOptin);
      case "firstName":
        return this.firstNameVerify(data.user.userProfile.firstName);
      case "lastName":
        return this.lastNameVerify(data.user.userProfile.lastName);
      case "gender":
        return this.genderVerify(data.user.userProfile.gender);
      case "status":
        return this.statusVerify(data.user.userProfile.type);
      case "birthdate":
        return this.birthdateVerify(data.user.userProfile.birthdate);
      case "country":
        return this.countryVerify(data.user.userProfile.address.country.isocode);
      case "zipcode":
        return this.zipcodeVerify(data.user.userProfile.address.zipcode);
      case "city":
        return this.cityVerify(data.user.userProfile.address.city);
      case "street":
        return this.streetVerify(data.user.userProfile.address.line1);
      case "phoneNumber":
        return this.phoneNumberVerify(data.user.userProfile.phone1);
      case "pwd":
        return this.pwdVerify(data.user.password);
      case "pwdConfirmation":
        return this.pwdConfirmationVerify(data.user.password, data.user.passwordConfirmation);
      case "siret":
        return this.siretVerify(data.user.userProfile.company.siret);
      case "tva":
        return this.tvaVerify(data.user.userProfile.company.tvanumber);
    }
  }
}
