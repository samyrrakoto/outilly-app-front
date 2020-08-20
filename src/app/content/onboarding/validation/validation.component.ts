import { Component } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router, formValidatorService: FormValidatorService, public request: RequestService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
  }

  checkResponse(response: HttpResponse<User>) {
    let status201: boolean = response.status == 201;
    let matchingUsername: boolean = response.body.username == this.formDataService.user.username;
    let existingId: boolean = response.body.id != 0;
    let isOk: boolean = status201 && matchingUsername && existingId;

    if (isOk)
      this.router.navigateByUrl("confirmation");
    else
      console.log("ERROR");
  }

  submit(): void {
    let data = JSON.stringify(this.formDataService);
    let response = this.request.createUser(data);

    response.subscribe((res: HttpResponse<User>) => {
      this.checkResponse(res);
    });
  }
}
