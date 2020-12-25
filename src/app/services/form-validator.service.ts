import { ProductReference } from 'src/app/models/product-reference';
import { FormConstraintService } from 'src/app/services/form-constraint.service';
import { ProductMedia } from 'src/app/models/product-media';
import { ProductType } from 'src/app/models/product-type';
import { ProductCategory } from 'src/app/models/product-category';
import { Brand } from 'src/app/models/brand';
import { Injectable } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { RequestService } from 'src/app/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  isValid: boolean;
  iexist : boolean;

  constructor(
    public request: RequestService,
    public constraintManager: FormConstraintService)
  {}

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

    if (notEnoughElements) {
      return false;
    }
    return true;
  }

  productConsumableVerify(data: FormDataService) {
    const productConsumable: boolean = data.product.isConsumable;
    const empty: boolean = this.constraintManager.isEmpty(productConsumable);

    if (empty)
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

  productReferenceVerify(data: FormDataService): boolean {
    const productReferences: ProductReference[] = data.product.productReferences;
    const empty: boolean = this.constraintManager.isEmpty(productReferences);

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
    const maxLength: boolean = this.constraintManager.maxLength(productDescription, 650);

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

  private usernameCall(username: string): Promise<boolean> {
    const payload: any = {
      entity: "user",
      field: "username",
      value: username
    };

    return new Promise((resolve) => {
      this.request.postData(payload, this.request.uri.CHECK_EXIST).subscribe(
        (res: any) => {
          resolve(res.body.exists);
        }
      )
    });
  }

  usernameExistenceVerify(data: FormDataService): Promise<boolean> {
    const username: string = data.user.userProfile.email;
    const message: string = "Cette adresse email est déjà utilisée";

    return new Promise((resolve) => {
      this.usernameCall(username)
      .then((value: boolean) => {
        if (value) {
          this.constraintManager.errorMessageManager.addErrorMessage(message);
        }
        else {
          this.constraintManager.errorMessageManager.removeErrorMessage(message);
        }
        resolve(!value);
      });
    });
  }

  /* Constraints manager called by the form */
  verify(data: FormDataService): Promise<boolean> {
    return this[data.fieldName + "Verify"](data);
  }
}
