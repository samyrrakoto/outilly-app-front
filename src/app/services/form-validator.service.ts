import { FormConstraintService } from './form-constraint.service';
import { ProductMedia } from 'src/app/models/product-media';
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

  constructor(public request: RequestService,
  public constraintManager: FormConstraintService)
  {
    this.errorMessages = [];
  }

  /* ERROR MESSAGES */
  private isMessageExisting(message: string): boolean {
    for (const errorMessage of this.errorMessages) {
      if (message === errorMessage) {
        return true;
      }
    }
    return false;
  }

  public addErrorMessage(message: string): void {
    if (!this.isMessageExisting(message)) {
      this.errorMessages.push(message);
    }
  }

  private removeErrorMessage(message: string): void {
    for (let i=0; i<this.errorMessages.length; i++) {
      if (message === this.errorMessages[i]) {
        this.errorMessages.splice(i, 1);
      }
    }
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
    const empty: boolean = this.constraintManager.isEmpty(username);
    const tooShort: boolean = this.constraintManager.isTooShort(username);

    if (empty || tooShort)
      return false;
    return true;
  }

  emailVerify(data: FormDataService): boolean {
    const email: string = data.user.userProfile.email;
    const empty: boolean = this.constraintManager.isEmpty(email);
    const mailConform: boolean = this.constraintManager.isMailConform(email);

    if (empty || mailConform == false)
      return false;
    return true;
  }

  emailOptinVerify(data: FormDataService): boolean {
    const emailOptin: boolean = data.user.userProfile.emailOptin;
    const empty: boolean = this.constraintManager.isEmpty(emailOptin);

    if (empty)
      return false;
    return true;
  }

  firstnameVerify(data: FormDataService): boolean {
    const firstname: string = data.user.userProfile.firstname;
    const empty: boolean = this.constraintManager.isEmpty(firstname);
    const nameNotConform: boolean = this.constraintManager.isNameNotConform(firstname);

    if (empty || nameNotConform)
      return false;
    return true;
  }

  lastnameVerify(data: FormDataService): boolean {
    const lastname: string = data.user.userProfile.lastname;
    const empty: boolean = this.constraintManager.isEmpty(lastname);
    const nameNotConform: boolean = this.constraintManager.isNameNotConform(lastname);

    if (empty || nameNotConform)
      return false;
    return true;
  }

  genderVerify(data: FormDataService): boolean {
    const gender:string = data.user.userProfile.gender;
    const empty: boolean = this.constraintManager.isEmpty(gender);

    if (empty)
      return false;
    return true;
  }

  statusVerify(data: FormDataService): boolean {
    const status: string = data.user.userProfile.type;
    const empty: boolean = this.constraintManager.isEmpty(status);

    if (empty)
      return false;
    return true;
  }

  birthdateVerify(data: FormDataService): boolean {
    const birthdate: number = data.user.userProfile.birthdate;
    const empty: boolean = this.constraintManager.isEmpty(birthdate);

    if (empty)
      return false;
    return true;
  }

  countryVerify(data: FormDataService): boolean {
    const country: string = data.user.userProfile.mainAddress.country.isoCode;
    const empty: boolean = this.constraintManager.isEmpty(country);

    if (empty)
      return false;
    return true;
  }

  zipcodeVerify(data: FormDataService): boolean {
    const zipcode: string = data.user.userProfile.mainAddress.zipcode;
    const empty: boolean = this.constraintManager.isEmpty(zipcode);
    const notNum: boolean = this.constraintManager.isNotNum(zipcode);
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

    const wrongLength: boolean = this.constraintManager.wrongLength(zipcode, length);

    if (empty || notNum || wrongLength)
      return false;
    return true;
  }

  cityVerify(data: FormDataService): boolean {
    const city: string = data.user.userProfile.mainAddress.city;
    const empty: boolean = this.constraintManager.isEmpty(city);

    if (empty)
      return false;
    return true;
  }

  streetVerify(data: FormDataService): boolean {
    const street: string = data.user.userProfile.mainAddress.line1;
    const empty: boolean = this.constraintManager.isEmpty(street);

    if (empty)
      return false;
    return true;
  }

  phoneNumberVerify(data: FormDataService): boolean {
    const phoneNumber: string = data.user.userProfile.phone1;
    const empty: boolean = this.constraintManager.isEmpty(phoneNumber);

    if (empty)
      return false;
    return true;
  }

  pwdVerify(data: FormDataService): boolean {
    const pwd: string = data.user.password;
    const empty: boolean = this.constraintManager.isEmpty(pwd);
    const tooShort: boolean = this.constraintManager.isTooShort(pwd, 6);

    if (empty || tooShort)
      return false;
    return true;
  }

  pwdConfirmationVerify(data: FormDataService): boolean {
    const pwd: string = data.user.password;
    const pwdConfirmation: string = data.user.passwordConfirmation;
    const different: boolean = this.constraintManager.isPwdConfirmationDifferent(pwd, pwdConfirmation);

    if (different)
      return false;
    return true;
  }

  siretVerify(data: FormDataService): boolean {
    const siret: string = data.user.userProfile.company.siret;
    const empty: boolean = this.constraintManager.isEmpty(siret);
    const wrongLength: boolean = this.constraintManager.wrongLength(siret, 14);
    const notNum: boolean = this.constraintManager.isNotNum(siret);

    if (empty || notNum || wrongLength)
      return false;
    return true;
  }

  tvaVerify(data: FormDataService): boolean {
    const tva: string = data.user.userProfile.company.tvanumber;
    const empty: boolean = this.constraintManager.isEmpty(tva);
    const notNum: boolean = this.constraintManager.isNotNum(tva);

    if (empty || notNum)
      return false;
    return true;
  }

  batchChoiceVerify(data: FormDataService): boolean {
    const batchChoice: boolean = data.product.isBundle;
    const empty: boolean = this.constraintManager.isEmpty(batchChoice);

    if (empty)
      return false;
    return true;
  }

  announcementTitleVerify(data: FormDataService): boolean {
    const announcementTitle: string = data.product.name;
    const empty: boolean = this.constraintManager.isEmpty(announcementTitle);

    if (empty)
      return false;
    return true;
  }

  mediaUploadVerify(data: FormDataService): boolean {
    const medias: Array<ProductMedia> = data.product.productMedias;
    const notEnoughElements: boolean = this.constraintManager.hasNotEnoughElements(medias, 3);

    //TODO fixbug
    /*let mediaUpload: Array<ProductMedia> = data.product.productMedias;
    let wrongFormat: boolean = false;

    for (const media of data.product.productMedias) {
      if (this.constraintManager.isWrongFormat(media.path, ['.jpg', '.png'])) {
        wrongFormat = true;
      }
    }

    if (wrongFormat) {
      return false;
    }*/
    if (notEnoughElements) {
      return false;
    }
    return true;
  }

  activityDomainVerify(data: FormDataService): boolean {
    const activityDomain: Array<ActivityDomain> = data.product.activityDomains;
    const empty: boolean = this.constraintManager.isEmpty(activityDomain);
    const maxNb: boolean = this.constraintManager.maxNb(activityDomain, 2);

    if (empty || maxNb)
      return false;
    return true;
  }

  productBrandVerify(data: FormDataService): boolean {
    const productBrand: Array<Brand> = data.product.brands;
    const empty: boolean = this.constraintManager.isEmpty(productBrand);

    if (empty)
      return false;
    return true;
  }

  productCategoryVerify(data: FormDataService): boolean {
    const productCategories: Array<ProductCategory> = data.product.productCategories;
    const empty: boolean = this.constraintManager.isEmpty(productCategories);

    if (empty)
      return false;
    return true;
  }

  productTypeVerify(data: FormDataService): boolean {
    const productType: Array<ProductType> = data.product.productTypes;
    const empty: boolean = this.constraintManager.isEmpty(productType);

    if (empty)
      return false;
    return true;
  }

  productStateVerify(data: FormDataService): boolean {
    const productState: string = data.product.quality;
    const empty: boolean = this.constraintManager.isEmpty(productState);

    if (empty)
      return false;
    return true;
  }

  productDescriptionVerify(data: FormDataService): boolean {
    const productDescription: string = data.product.description;
    const minLength: boolean = this.constraintManager.minLength(productDescription, 20);
    const maxLength: boolean = this.constraintManager.maxLength(productDescription, 1500);

    if (minLength || maxLength) {
      return false;
    }
    return true;
  }

  reservePriceVerify(data: FormDataService): boolean {
    const reservePrice: number = data.product.reservePrice;
    const empty: boolean = this.constraintManager.isEmpty(reservePrice);

    if (empty) {
      return false;
    }
    return true;
  }

  productZipcodeVerify(data: FormDataService): boolean {
    const locality: string = data.product.locality;
    const empty: boolean = this.constraintManager.isEmpty(locality);
    const isNotNum: boolean = this.constraintManager.isNotNum(locality);

    if (empty || isNotNum)
      return false;
    return true;
  }

  productDeliveryVerify(data: FormDataService): boolean {
    const isWarrantied: boolean = data.product.isWarrantied;
    const empty: boolean = this.constraintManager.isEmpty(isWarrantied);

    if (empty)
      return false;
    return true;
  }

  productWeightVerify(data: FormDataService): boolean {
    const productWeight: number = data.product.weight;
    const weightUnity: string = data.product.weightUnity;
    const empty: boolean = this.constraintManager.isEmpty(productWeight);
    const maxWeight: boolean = this.constraintManager.maxWeight(productWeight, weightUnity, 30);

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
    const empty: boolean = this.constraintManager.isEmpty(warrantyDuration);

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

  /* Constraints manager called by the form */
  verify(data: FormDataService): boolean {
    return this[data.fieldName + "Verify"](data);
  }
}
