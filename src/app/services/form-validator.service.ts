import { Injectable } from '@angular/core';
import { FormDataService } from './form-data.service';
import { RequestService } from './request.service';
import { User } from '../models/user';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  errorMessages: Array<string>;
  isValid: boolean;
  iexist : boolean;

  constructor(public request: RequestService) {
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
  isTooShort(username: string, minLength: number = 4): boolean {
    let message = "Le nom d'utilisateur doit faire au moins 4 caractères !";
    let index = this.errorMessages.indexOf(message);

    if (username.length < minLength) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

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
    let usernameExists: boolean = this.isUsernameExists(data);

    if (empty || tooShort)
      return false;
    return true;
  }

  /*
  ----- Email constraints
  */
  emailVerify(data: FormDataService): boolean {
    let email: string = data.user.userProfile.email;

    if (this.isEmpty(email))
      return false;
    return true;
  }

  /*
  ----- Email Optin constraints
  */
  emailOptinVerify(data: FormDataService): boolean {
    let emailOptin: boolean = data.user.userProfile.emailOptin;

    if (this.isEmptyBool(emailOptin))
      return false;
    return true;
  }

  /*
  ----- Firstname constraints
  */

  firstNameVerify(data: FormDataService): boolean {
    let firstName: string = data.user.userProfile.firstName;

    if (this.isEmpty(firstName))
      return false;
    return true;
  }

  /*
  ----- Lastname constraints
  */

  lastNameVerify(data: FormDataService): boolean {
    let lastName: string = data.user.userProfile.lastName;

    if (this.isEmpty(lastName))
      return false;
    return true;
  }

  /*
  ----- Gender constraints
  */
  genderVerify(data: FormDataService): boolean {
    let gender:string = data.user.userProfile.gender;

    if (this.isEmpty(gender))
      return false;
    return true;
  }

  /*
  ----- Status constraints
  */
  statusVerify(data: FormDataService): boolean {
    let status: string = data.user.userProfile.type;

    if (this.isEmpty(status))
      return false;
    return true;
  }

  /*
  ----- Birthdate constraints
  */
  birthdateVerify(data: FormDataService): boolean {
    let birthdate: Date = data.user.userProfile.birthdate;

    if (this.isEmptyDate(birthdate))
      return false;
    return true;
  }

  /*
  ----- Country constraints
  */
  countryVerify(data: FormDataService): boolean {
    let country: string = data.user.userProfile.address.country.isocode;

    if (this.isEmpty(country))
      return false;
    return true;
  }

  /*
  ----- Zipcode constraints
  */
  zipcodeVerify(data: FormDataService): boolean {
    let zipcode: string = data.user.userProfile.address.zipcode;

    if (this.isEmpty(zipcode))
      return false;
    return true;
  }

  /*
  ----- City constraints
  */
  cityVerify(data: FormDataService): boolean {
    let city: string = data.user.userProfile.address.city;

    if (this.isEmpty(city))
      return false;
    return true;
  }

  /*
  ----- Street constraints
  */
  streetVerify(data: FormDataService): boolean {
    let street: string = data.user.userProfile.address.line1;

    if (this.isEmpty(street))
      return false;
    return true;
  }

  /*
  ----- Phone number constraints
  */
  phoneNumberVerify(data: FormDataService): boolean {
    let phoneNumber: string = data.user.userProfile.phone1;

    if (this.isEmpty(phoneNumber))
      return false;
    return true;
  }

  /*
  ----- Password constraints
  */

  pwdVerify(data: FormDataService): boolean {
    let pwd = data.user.password;

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

  pwdConfirmationVerify(data: FormDataService): boolean {
    let pwd: string = data.user.password;
    let pwdConfirmation: string = data.user.passwordConfirmation;

    if (this.isPwdConfirmationDifferent(pwd, pwdConfirmation))
      return false;
    return true;
  }

  /*
  ----- Siret constraints
  */
  siretVerify(data: FormDataService): boolean {
    let siret: string = data.user.userProfile.company.siret;

    if (this.isEmpty(siret))
      return false;
    return true;
  }

  /*
  ----- TVA constraints
  */
  tvaVerify(data: FormDataService): boolean {
    let tva: string = data.user.userProfile.company.tvanumber;

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
        return this.userNameVerify(data);
      case "email":
        return this.emailVerify(data);
      case "emailOptin":
        return this.emailOptinVerify(data);
      case "firstName":
        return this.firstNameVerify(data);
      case "lastName":
        return this.lastNameVerify(data);
      case "gender":
        return this.genderVerify(data);
      case "status":
        return this.statusVerify(data);
      case "birthdate":
        return this.birthdateVerify(data);
      case "country":
        return this.countryVerify(data);
      case "zipcode":
        return this.zipcodeVerify(data);
      case "city":
        return this.cityVerify(data);
      case "street":
        return this.streetVerify(data);
      case "phoneNumber":
        return this.phoneNumberVerify(data);
      case "pwd":
        return this.pwdVerify(data);
      case "pwdConfirmation":
        return this.pwdConfirmationVerify(data);
      case "siret":
        return this.siretVerify(data);
      case "tva":
        return this.tvaVerify(data);
    }
  }
}
