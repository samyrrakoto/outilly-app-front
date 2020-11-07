import { ProductType } from './../models/product-type';
import { ProductCategory } from './../models/product-category';
import { Brand } from './../models/brand';
import { ActivityDomain } from './../models/activity-domain';
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
  readonly REQUIRED: string = "Ce champ est requis !";

  constructor(public request: RequestService) {
    this.errorMessages = [];
  }

  isEmpty(field: any): boolean {
    const message: string = this.REQUIRED;
    const index: number = this.errorMessages.indexOf(message);
    const messageUnexists: boolean = this.errorMessages.indexOf(message) === -1;
    const emptyErrors: boolean = this.errorMessages.length === 0;
    let hasError: boolean;

    // Depending on the type we set a null value
    if (typeof(field) === "string") hasError = field === "";
    else if (field instanceof Date) hasError = field === null;
    else if (field instanceof Array) hasError = field.length === 0;
    else if (typeof(field) === "boolean") hasError = field === null;

    if (hasError) {
      if (messageUnexists && emptyErrors)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  isNotNum(field: string) {
    const message: string = "Le champ doit contenir uniquement des chiffres !";
    const index: number = this.errorMessages.indexOf(message);
    const regex: RegExp = /^[0-9]+$/;

    if (!field.match(regex)) {
      if (this.errorMessages.indexOf(message) == -1 && field.length > 0)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  isTooShort(field: string, minLength: number = 4): boolean {
    const message: string = "Le champ doit faire au moins " + minLength + " caractères !";
    const index: number = this.errorMessages.indexOf(message);

    if (field.length < minLength) {
      if (this.errorMessages.indexOf(message) == -1 && field.length > 0)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  maxNb(field: Array<any>, maxNb: number): boolean {
    const message: string = "Vous ne pouvez prendre que 2 domaines d'activité au maximum";
    const index: number = this.errorMessages.indexOf(message);

    if (field.length > maxNb) {
      if (this.errorMessages.indexOf(message) == -1 && field.length > 0) {
        this.errorMessages.push(message);
      }
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  wrongLength(field: string, length: number = 10) {
    const message: string = "Le champ doit faire " + length + " caractères !";
    const index: number = this.errorMessages.indexOf(message);

    if (field.length != length) {
      if (this.errorMessages.indexOf(message) == -1 && field.length > 0)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  isWrongFormat(file: string, extensions: Array<string>) {
    let message: string = 'Tous les fichiers doivent être du ou des format(s) suivant(s) : ';

    for (const extension of extensions) {
      message += extension + ' ';
    }

    for (const extension of extensions) {
      if (file.endsWith(extension)) {
        return false;
      }
    }

    this.errorMessages.push(message);
    return true;
  }

  isMailConform(field: string): boolean {
    const regex: RegExp = /^[a-z0-9-._]+@[a-z-]+\.[a-z]+$/;
    const message: string = "L'adresse n'est pas conforme";

    if (field.match(regex))
      return true;
    if (this.errorMessages.indexOf(message) == -1 && field.length > 0)
      this.errorMessages.push(message);
    return false;
  }

  isNameConform(field: string): boolean {
    const regex: RegExp = /^[a-zA-Z-éèâ' ]+$/;
    const message: string = "Le nom n'est pas conforme";

    if (field.match(regex))
      return true;
    if (this.errorMessages.indexOf(message) == -1 && field.length > 0)
      this.errorMessages.push(message);
    return false;
  }

  isCityConform(field: string): boolean {
    const regex: RegExp = /^[a-zA-Z-' ]+$/;
    const message: string = "Le nom n'est pas conforme";

    if (field.match(regex))
      return true;
    if (this.errorMessages.indexOf(message) == -1 && field.length > 0)
      this.errorMessages.push(message);
    return false;
  }

  isStreetConform(field: string): boolean {
    const regex: RegExp = /^[1-9][0-9]{0,3}[ ](bis |ter )?(rue|avenue|av|boulevard|bd|villa|passage)[ ][a-zA-Z]+$/;
    const message: string = "L'adresse n'est pas conforme";

    if (field.match(regex))
      return true;
    if (this.errorMessages.indexOf(message) == -1 && field.length > 0)
      this.errorMessages.push(message);
    return false;
  }

  //TODO : finish implementation of user existence checking
  checkUsernameExists(response: HttpResponse<any>): boolean {
    const hasExists: boolean = response.body.exists === true;
    const message: string = "Cet utilisateur existe déjà !";
    const index = this.errorMessages.indexOf(message);

    if (hasExists === true) {
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
    const username: string = data.user.username;
    const empty: boolean = this.isEmpty(username);
    const tooShort: boolean = this.isTooShort(username);

    if (empty || tooShort)
      return false;
    return true;
  }

  emailVerify(data: FormDataService): boolean {
    const email: string = data.user.userProfile.email;
    const empty: boolean = this.isEmpty(email);
    const mailConform: boolean = this.isMailConform(email);

    if (empty || mailConform == false)
      return false;
    return true;
  }

  emailOptinVerify(data: FormDataService): boolean {
    const emailOptin: boolean = data.user.userProfile.emailOptin;
    const empty: boolean = this.isEmpty(emailOptin);

    if (empty)
      return false;
    return true;
  }

  firstnameVerify(data: FormDataService): boolean {
    const firstname: string = data.user.userProfile.firstname;
    const empty: boolean = this.isEmpty(firstname);
    const nameConform: boolean = this.isNameConform(firstname);

    if (empty || nameConform == false)
      return false;
    return true;
  }

  lastnameVerify(data: FormDataService): boolean {
    const lastname: string = data.user.userProfile.lastname;
    const empty: boolean = this.isEmpty(lastname);
    const nameConform: boolean = this.isNameConform(lastname);

    if (empty || nameConform == false)
      return false;
    return true;
  }

  genderVerify(data: FormDataService): boolean {
    const gender:string = data.user.userProfile.gender;
    const empty: boolean = this.isEmpty(gender);

    if (empty)
      return false;
    return true;
  }

  statusVerify(data: FormDataService): boolean {
    const status: string = data.user.userProfile.type;
    const empty: boolean = this.isEmpty(status);

    if (empty)
      return false;
    return true;
  }

  birthdateVerify(data: FormDataService): boolean {
    const birthdate: Date = data.user.userProfile.birthdate;
    const empty: boolean = this.isEmpty(birthdate);

    if (empty)
      return false;
    return true;
  }

  countryVerify(data: FormDataService): boolean {
    const country: string = data.user.userProfile.mainAddress.country.isoCode;
    const empty: boolean = this.isEmpty(country);

    if (empty)
      return false;
    return true;
  }

  zipcodeVerify(data: FormDataService): boolean {
    const zipcode: string = data.user.userProfile.mainAddress.zipcode;
    const empty: boolean = this.isEmpty(zipcode);
    const notNum: boolean = this.isNotNum(zipcode);
    let length: number;

    switch (data.user.userProfile.mainAddress.country.isoCode) {
      case "FR":
        length = 5;
        break;
      case "BE":
      case "LU":
      case "CH":
        length = 4;
        break;
    }

    const wrongLength: boolean = this.wrongLength(zipcode, length);

    if (empty || notNum || wrongLength)
      return false;
    return true;
  }

  cityVerify(data: FormDataService): boolean {
    const city: string = data.user.userProfile.mainAddress.city;
    const empty: boolean = this.isEmpty(city);

    if (empty)
      return false;
    return true;
  }

  streetVerify(data: FormDataService): boolean {
    const street: string = data.user.userProfile.mainAddress.line1;
    const empty: boolean = this.isEmpty(street);

    if (empty)
      return false;
    return true;
  }

  phoneNumberVerify(data: FormDataService): boolean {
    const phoneNumber: string = data.user.userProfile.phone1;
    const empty: boolean = this.isEmpty(phoneNumber);

    return true;
  }

  pwdVerify(data: FormDataService): boolean {
    const pwd: string = data.user.password;
    const empty: boolean = this.isEmpty(pwd);
    const tooShort: boolean = this.isTooShort(pwd, 6);

    if (empty || tooShort)
      return false;
    return true;
  }

  isPwdConfirmationDifferent(pwd: string, pwdConfirmation: string): boolean {
    const message: string = "Les mots de passe sont différents !";
    const index: number = this.errorMessages.indexOf(message);

    if (pwd != pwdConfirmation) {
      if (this.errorMessages.indexOf(message) == -1)
        this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  pwdConfirmationVerify(data: FormDataService): boolean {
    const pwd: string = data.user.password;
    const pwdConfirmation: string = data.user.passwordConfirmation;
    const different: boolean = this.isPwdConfirmationDifferent(pwd, pwdConfirmation);

    if (different)
      return false;
    return true;
  }

  siretVerify(data: FormDataService): boolean {
    const siret: string = data.user.userProfile.company.siret;
    const empty: boolean = this.isEmpty(siret);
    const wrongLength: boolean = this.wrongLength(siret, 14);
    const notNum: boolean = this.isNotNum(siret);

    if (empty || notNum || wrongLength)
      return false;
    return true;
  }

  tvaVerify(data: FormDataService): boolean {
    const tva: string = data.user.userProfile.company.tvanumber;
    const empty: boolean = this.isEmpty(tva);
    const notNum: boolean = this.isNotNum(tva);

    if (empty || notNum)
      return false;
    return true;
  }

  maxWeight(weight: number, weightUnity: string, maxWeight: number) {
    const message: string = "Le poids du colis ne doit pas dépasser " + maxWeight + " kg";
    const index: number = this.errorMessages.indexOf(message);
    maxWeight = weightUnity === 'kg' ? maxWeight : maxWeight * 1000;

    if (weight > maxWeight) {
      this.errorMessages.push(message);
      return true;
    }
    this.errorMessages.splice(index);
    return false;
  }

  batchChoiceVerify(data: FormDataService): boolean {
    const batchChoice: boolean = data.product.isBundle;
    const empty: boolean = this.isEmpty(batchChoice);

    if (empty)
      return false;
    return true;
  }

  announcementTitleVerify(data: FormDataService): boolean {
    const announcementTitle: string = data.product.name;
    const empty: boolean = this.isEmpty(announcementTitle);

    if (empty)
      return false;
    return true;
  }

  mediaUploadVerify(data: FormDataService): boolean {
    //TODO fixbug
    /*let mediaUpload: Array<ProductMedia> = data.product.productMedias;
    const empty: boolean = this.isEmpty(mediaUpload);
    let wrongFormat: boolean = false;

    for (const media of data.product.productMedias) {
      if (this.isWrongFormat(media.path, ['.jpg', '.png'])) {
        wrongFormat = true;
      }
    }

    if (wrongFormat) {
      return false;
    }*/
    return true;
  }

  activityDomainVerify(data: FormDataService): boolean {
    const activityDomain: Array<ActivityDomain> = data.product.activityDomains;
    const empty: boolean = this.isEmpty(activityDomain);
    const maxNb: boolean = this.maxNb(activityDomain, 2);

    if (empty || maxNb)
      return false;
    return true;
  }

  productBrandVerify(data: FormDataService): boolean {
    const productBrand: Array<Brand> = data.product.brands;
    const empty: boolean = this.isEmpty(productBrand);

    if (empty)
      return false;
    return true;
  }

  productCategoryVerify(data: FormDataService): boolean {
    const productCategories: Array<ProductCategory> = data.product.productCategories;
    const empty: boolean = this.isEmpty(productCategories);

    if (empty)
      return false;
    return true;
  }

  productTypeVerify(data: FormDataService): boolean {
    const productType: Array<ProductType> = data.product.productTypes;
    const empty: boolean = this.isEmpty(productType);

    if (empty)
      return false;
    return true;
  }

  productStateVerify(data: FormDataService): boolean {
    const productState: string = data.product.quality;
    const empty: boolean = this.isEmpty(productState);

    if (empty)
      return false;
    return true;
  }

  productDescriptionVerify(data: FormDataService): boolean {
    const productState: string = data.product.description;
    const empty: boolean = this.isEmpty(productState);

    if (empty)
      return false;
    return true;
  }

  productZipcodeVerify(data: FormDataService): boolean {
    const locality: string = data.product.locality;
    const empty: boolean = this.isEmpty(locality);

    if (empty)
      return false;
    return true;
  }

  productDeliveryVerify(data: FormDataService): boolean {
    const isWarrantied: boolean = data.product.isWarrantied;
    const empty: boolean = this.isEmpty(isWarrantied);

    if (empty)
      return false;
    return true;
  }

  productWeightVerify(data: FormDataService): boolean {
    const productWeight: number = data.product.weight;
    const weightUnity: string = data.product.weightUnity;
    const empty: boolean = this.isEmpty(productWeight);
    const maxWeight: boolean = this.maxWeight(productWeight, weightUnity, 30);

    if (empty || maxWeight)
      return false;
    return true;
  }

  deliveryPriceInformationVerify(data: FormDataService): boolean {
    return true;
  }

  isWarrantiedVerify(data: FormDataService): boolean {
    return true;
  }

  warrantyDurationVerify(data: FormDataService): boolean {
    const warrantyDuration: number = data.product.warrantyDuration;
    const empty: boolean = this.isEmpty(warrantyDuration);

    if (empty)
      return false;
    return true;
  }

  videoUploadVerify(data: FormDataService): boolean {
    return true;
  }

  announceKindVerify(data: FormDataService): boolean {
    return true;
  }

  reservePriceVerify(data: FormDataService): boolean {
    return true;
  }

  /* Constraints manager called by the form */
  verify(data: FormDataService): boolean {
    return this[data.fieldName + "Verify"](data);
  }
}
