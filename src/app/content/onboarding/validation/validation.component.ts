import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { HttpResponse } from '@angular/common/http';
import { FormDataService } from 'src/app/services/form-data.service';
import { OnboardingComponent } from '../onboarding.component';
import { UserProfile } from 'src/app/models/user-profile';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent extends OnboardingComponent implements OnInit {

  constructor(public formDataService: FormDataService, public router: Router, formValidatorService: FormValidatorService, public request: RequestService) {
    super(formDataService, router, formValidatorService);
    this.user = this.formDataService.user;
  }

  ngOnInit() {
    this.formDataService.isAccountComplete = true;
  }

  checkResponse(response: HttpResponse<User>) {
    const status201: boolean = response.status === 201;
    const matchingUsername: boolean = response.body.username === this.formDataService.user.username;
    const existingId: boolean = response.body.id !== 0;
    const isOk: boolean = status201 && matchingUsername && existingId;

    if (isOk)
      this.router.navigate(['onboarding/confirmation']);
  }

  public submit(): void {
    const user: any = this.createPayload();
    const response: any = this.request.createUser(user);

    response.subscribe((res: HttpResponse<User>) => {
      this.checkResponse(res);
    });
  }

  private createPayload(): any {
    const userPayload: any = {
      "user": {
        "username": this.formDataService.user.username,
        "password": this.formDataService.user.password,
        "passwordConfirmation": this.formDataService.user.passwordConfirmation,
        "userProfile": this.createUserProfilePayload()
      }
    };

    return userPayload;
  }

  private createUserProfilePayload(): any {
    const userProfilePayload: any = {
      "firstname": this.formDataService.user.userProfile.firstname,
      "lastname": this.formDataService.user.userProfile.lastname,
      "email": this.formDataService.user.userProfile.email,
      "emailoptin": this.formDataService.user.userProfile.emailOptin,
      "phone1": this.formDataService.user.userProfile.phone1,
      "phone1Optin": this.formDataService.user.userProfile.phone1Optin,
      "gender": this.formDataService.user.userProfile.gender,
      "birthdate": this.getBirthdate(),
      "type": this.formDataService.user.userProfile.type,
      "company": this.createCompanyPayload(),
      "address": this.createAddressPayload()
    };

    return userProfilePayload;
  }

  private getBirthdate(): string {
    const birthdate: Date = new Date(this.formDataService.user.userProfile.birthdate);

    return Math.floor(birthdate.getTime() / 1000).toString();
  }

  private createCompanyPayload(): string {
    if (this.formDataService.user.userProfile.type === 'professionnal') {
      const companyPayload: any = {
        "name": this.formDataService.user.userProfile.lastname,
        "siret": this.formDataService.user.userProfile.company.siret,
        "tva": this.formDataService.user.userProfile.company.tvanumber
      };

      return companyPayload;
    }
    return null;
  }

  private createAddressPayload(): any {
    const addressPayload: any = {
      "type": "billing",
      "line1": this.formDataService.user.userProfile.mainAddress.line1,
      "zipcode": this.formDataService.user.userProfile.mainAddress.zipcode,
      "city": this.formDataService.user.userProfile.mainAddress.city,
      "country": {
        "name": this.formDataService.user.userProfile.mainAddress.country.name,
        "isocode": this.formDataService.user.userProfile.mainAddress.country.isoCode
      }
    };

    return addressPayload;
  }
}
