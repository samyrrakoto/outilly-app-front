import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { StringToolboxService } from './string-toolbox.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingRequestService {

  constructor(
    private request: RequestService,
    private strToolbox: StringToolboxService
  ) { }

  public createAccount(accountData: any): Observable<HttpResponse<any>> {
    const payload: any = this.getAccountPayload(accountData);

    return this.request.postData(payload, this.request.uri.USER, [this.request.uri.CREATE]);
  }

  private getAccountPayload(accountData: any): any {
    const accountPayload: any = {
      "user": {
        "username": accountData.userProfile.email,
        "password": accountData.password,
      }
    };
    return accountPayload;
  }

  public createProfile(profileData: any): Observable<HttpResponse<any>> {
    const payload: any = this.getUserProfilePayload(profileData);

    return this.request.putData(this.request.uri.UPDATE_USER, payload);
  }

  private getUserProfilePayload(userProfileData: any): any {
    const userProfilePayload: any = {
      "user": {
        "userProfile": {
          "firstname": this.strToolbox.capitalizeFirstLetter(userProfileData.firstname),
          "lastname": this.strToolbox.capitalizeFirstLetter(userProfileData.lastname),
          "phone1": userProfileData.phone1,
          "phone1Optin": userProfileData.phone1Optin,
          "gender": userProfileData.gender,
          "birthdate": this.getBirthdate(userProfileData.birthdate),
          "type": userProfileData.type
        }
      }
    };
    return userProfilePayload;
  }

  private getBirthdate(birthdate: any): string {
    const timestamp: Date = new Date(birthdate);

    return Math.floor(timestamp.getTime() / 1000).toString();
  }

  public createAddress(addressData: any): Observable<HttpResponse<any>> {
    const payload: any = this.getAddressPayload(addressData);

    return this.request.postData(payload, this.request.uri.ADD_ADDRESS);
  }

  private getAddressPayload(addressData: any): any {
    const addressPayload: any = {
      "address": {
        "type": "billing",
        "line1": addressData.line1,
        "zipcode": addressData.zipcode,
        "city": addressData.city,
        "country": {
          "isocode": addressData.country.isoCode
        }
      }
    };
    return addressPayload;
  }

  /*
  ** Company data contain :
  ** - name: string
  ** - siret: string
  ** - tvanumber: string
  */
  public createCompany(companyData: any): Observable<HttpResponse<any>> {
    const payload: any = this.getCompanyPayload(companyData);

    return this.request.postData(payload, this.request.uri.CREATE_COMPANY);
  }

  private getCompanyPayload(userData: any): any {
    const companyPayload: any = {
      "name": userData.name,
      "siret": userData.siret,
      "tvanumber": userData.tvanumber
    };
    return companyPayload;
  }
}
