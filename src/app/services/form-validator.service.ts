import { Injectable } from '@angular/core';
import { FormDataService } from './form-data.service';
import { RequestService } from './request.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  errorMessages: Array<string>;
  isValid: boolean;
  iexist : boolean;
  readonly ALPHA: string = "abcdefghijklmnopqrstuvwxyz-";
  readonly NUM: string = "0123456789";
  readonly ALPHANUM: string = this.ALPHA + this.NUM + " ";
  readonly REQUIRED = "Ce champ est requis !";

  constructor(public request: RequestService) {
    this.errorMessages = [];
  }

  /*
  ----- General constraints
  */

  isEmpty(field: any): boolean {
    let message: string = this.REQUIRED;
    let index: number = this.errorMessages.indexOf(message);
    let nullValue: any;

    // Depending on the type we set a null value
    if (typeof(field) == "string") nullValue = "";
    else if (field instanceof Date) nullValue = null;

    if (field == nullValue) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  isNotNum(fieldValue: string) {
    let message: string = "Le champ doit contenir uniquement des chiffres !";
    let index: number = this.errorMessages.indexOf(message);
    let alphabet: string = this.NUM;
    let isInAlphabet: boolean = false;

    for (let char of fieldValue) {
      isInAlphabet = false;

      for (let symbol of alphabet) {
        if (char == symbol)
          isInAlphabet = true;
      }
      if (isInAlphabet == false) {
        if (this.errorMessages.indexOf(message) == -1)
          this.errorMessages.push(message);
        return true;
      }
    }
    this.errorMessages.splice(index);
    return false;
  }

  isNotAlpha(field: string) {
    let message: string = "Le champ doit contenir uniquement des lettres ou des tirets !";
    let index: number = this.errorMessages.indexOf(message);
    let alphabet: string = this.ALPHA;
    let isInAlphabet: boolean = false;

    for (let char of field) {
      isInAlphabet = false;

      for (let symbol of alphabet) {
        if (char.toLowerCase() == symbol)
          isInAlphabet = true;
      }
      if (isInAlphabet == false) {
        if (this.errorMessages.indexOf(message) == -1)
          this.errorMessages.push(message);
        return true;
      }
    }
    this.errorMessages.splice(index);
    return false;
  }

  isNotAlphaNum(field: string) {
    let message: string = "Le champ ne doit pas contenir de caractères spéciaux !";
    let index: number = this.errorMessages.indexOf(message);
    let alphabet: string = this.ALPHANUM;
    let isInAlphabet: boolean = false;

    for (let char of field) {
      isInAlphabet = false;

      for (let symbol of alphabet) {
        if (char.toLowerCase() == symbol)
          isInAlphabet = true;
      }
      if (isInAlphabet == false) {
        if (this.errorMessages.indexOf(message) == -1)
          this.errorMessages.push(message);
        return true;
      }
    }
    this.errorMessages.splice(index);
    return false;
  }

  isTooShort(field: string, minLength: number = 4): boolean {
    let message: string = "Le champ doit faire au moins " + minLength + " caractères !";
    let index: number = this.errorMessages.indexOf(message);

    if (field.length < minLength) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  wrongLength(field: string, length: number = 10) {
    let message: string = "Le champ doit faire " + length + " caractères !";
    let index: number = this.errorMessages.indexOf(message);

    if (field.length != length) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  hasNotArobase(field: string): boolean {
    let message: string = "L'adresse mail doit contenir un @";

    for (let char of field) {
      if (char == "@")
        return false;
    }
    if (this.errorMessages.indexOf(message) == -1)
      this.errorMessages.push(message);
    return true;
  }

  /*
  ----- Username constraints
  */

  //TODO : finish implementation of user existence checking
  checkUsernameExists(response: HttpResponse<any>): boolean {
    let hasExists: boolean = response.body.exists === true;
    let message: string = "Cet utilisateur existe déjà !";
    let index = this.errorMessages.indexOf(message);
    if (hasExists === true) {
    let index = this.errorMessages.indexOf(message);
      this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  //TODO : finish implementation of user existence checking
  isUsernameExists(userData: FormDataService): boolean {
    let data = JSON.stringify(
      {
        "entity": "user",
        "field" : "username",
        "value" : userData.user.username
      }
    );
    let response = this.request.checkUsernameExistsCall(data);
    let userNameExists : boolean;
    response.subscribe((res: HttpResponse<any>) => {
      userNameExists = this.checkUsernameExists(res);
    });
    return userNameExists;
  }

  userNameVerify(data: FormDataService): boolean {
    let username: string = data.user.username;
    let empty: boolean = this.isEmpty(username);
    let tooShort: boolean = this.isTooShort(username);

    if (empty || tooShort)
      return false;
    return true;
  }

  /*
  ----- Email constraints
  */

  emailVerify(data: FormDataService): boolean {
    let email: string = data.user.userProfile.email;
    let empty: boolean = this.isEmpty(email);
    let hasNotArobase: boolean = this.hasNotArobase(email);

    if (empty || hasNotArobase)
      return false;
    return true;
  }

  /*
  ----- Email Optin constraints
  */

  emailOptinVerify(data: FormDataService): boolean {
    let emailOptin: boolean = data.user.userProfile.emailOptin;
    let empty: boolean = this.isEmpty(emailOptin);

    if (empty)
      return false;
    return true;
  }

  /*
  ----- Firstname constraints
  */

  firstNameVerify(data: FormDataService): boolean {
    let firstName: string = data.user.userProfile.firstName;
    let empty: boolean = this.isEmpty(firstName);
    let notAlpha: boolean = this.isNotAlpha(firstName);

    if (empty || notAlpha)
      return false;
    return true;
  }

  /*
  ----- Lastname constraints
  */

  lastNameVerify(data: FormDataService): boolean {
    let lastName: string = data.user.userProfile.lastName;
    let empty: boolean = this.isEmpty(lastName);
    let notNum: boolean = this.isNotAlpha(lastName);

    if (empty || notNum)
      return false;
    return true;
  }

  /*
  ----- Gender constraints
  */

  genderVerify(data: FormDataService): boolean {
    let gender:string = data.user.userProfile.gender;
    let empty: boolean = this.isEmpty(gender);

    if (empty)
      return false;
    return true;
  }

  /*
  ----- Status constraints
  */

  statusVerify(data: FormDataService): boolean {
    let status: string = data.user.userProfile.type;
    let empty: boolean = this.isEmpty(status);

    if (empty)
      return false;
    return true;
  }

  /*
  ----- Birthdate constraints
  */

  birthdateVerify(data: FormDataService): boolean {
    let birthdate: Date = data.user.userProfile.birthdate;
    let empty: boolean = this.isEmpty(birthdate);

    if (empty)
      return false;
    return true;
  }

  /*
  ----- Country constraints
  */

  countryVerify(data: FormDataService): boolean {
    let country: string = data.user.userProfile.address.country.isocode;
    let empty: boolean = this.isEmpty(country);

    if (empty)
      return false;
    return true;
  }

  /*
  ----- Zipcode constraints
  */

  zipcodeVerify(data: FormDataService): boolean {
    let zipcode: string = data.user.userProfile.address.zipcode;
    let empty: boolean = this.isEmpty(zipcode);
    let notNum: boolean = this.isNotNum(zipcode);
    let length: number;

    switch (data.user.userProfile.address.country.isocode) {
      case "FR":
        length = 5;
        break;
      case "BE":
      case "LU":
      case "CH":
        length = 4;
        break;
    }

    let wrongLength: boolean = this.wrongLength(zipcode, length);

    if (empty || notNum || wrongLength)
      return false;
    return true;
  }

  /*
  ----- City constraints
  */

  cityVerify(data: FormDataService): boolean {
    let city: string = data.user.userProfile.address.city;
    let empty: boolean = this.isEmpty(city);
    let notAlpha: boolean = this.isNotAlpha(city);

    if (empty || notAlpha)
      return false;
    return true;
  }

  /*
  ----- Street constraints
  */

  streetVerify(data: FormDataService): boolean {
    let street: string = data.user.userProfile.address.line1;
    let empty: boolean = this.isEmpty(street);
    let notAlphaNum: boolean = this.isNotAlphaNum(street);

    if (empty || notAlphaNum)
      return false;
    return true;
  }

  /*
  ----- Phone number constraints
  */

  phoneNumberVerify(data: FormDataService): boolean {
    let phoneNumber: string = data.user.userProfile.phone1;
    let notNum: boolean = this.isNotNum(phoneNumber);

    if (notNum)
      return false;
    return true;
  }

  /*
  ----- Password constraints
  */

  pwdVerify(data: FormDataService): boolean {
    let pwd: string = data.user.password;
    let empty: boolean = this.isEmpty(pwd);
    let tooShort: boolean = this.isTooShort(pwd, 6);

    if (empty || tooShort)
      return false;
    return true;
  }

  /*
  ----- Password Confirmation constraints
  */

  isPwdConfirmationDifferent(pwd: string, pwdConfirmation: string): boolean {
    let message: string = "Les mots de passe sont différents !";
    let index: number = this.errorMessages.indexOf(message);

    if (pwd != pwdConfirmation) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  pwdConfirmationVerify(data: FormDataService): boolean {
    let pwd: string = data.user.password;
    let pwdConfirmation: string = data.user.passwordConfirmation;
    let different: boolean = this.isPwdConfirmationDifferent(pwd, pwdConfirmation);

    if (different)
      return false;
    return true;
  }

  /*
  ----- Siret constraints
  */

  siretVerify(data: FormDataService): boolean {
    let siret: string = data.user.userProfile.company.siret;
    let empty: boolean = this.isEmpty(siret);
    let wrongLength: boolean = this.wrongLength(siret, 14);
    let notNum: boolean = this.isNotNum(siret);

    if (empty || notNum || wrongLength)
      return false;
    return true;
  }

  /*
  ----- TVA constraints
  */

  tvaVerify(data: FormDataService): boolean {
    let tva: string = data.user.userProfile.company.tvanumber;
    let empty: boolean = this.isEmpty(tva);
    let notNum: boolean = this.isNotNum(tva);

    if (empty || notNum)
      return false;
    return true;
  }

  /*
  ----- Constraints manager called by the form
  */

  verify(data: FormDataService): boolean {
    return this[data.fieldName + "Verify"](data);
  }
}
