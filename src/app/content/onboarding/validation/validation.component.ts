import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { HttpResponse } from '@angular/common/http';
import { FormDataService } from 'src/app/services/form-data.service';
import { OnboardingComponent } from '../onboarding.component';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent extends OnboardingComponent implements OnInit {

  constructor(public formDataService: FormDataService, public router: Router, formValidatorService: FormValidatorService, public request: RequestService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
  }

  ngOnInit() {
    this.formDataService.isAccountComplete = true;
  }

  checkResponse(response: HttpResponse<User>) {
    let status201: boolean = response.status == 201;
    let matchingUsername: boolean = response.body.username == this.formDataService.user.username;
    let existingId: boolean = response.body.id != 0;
    let isOk: boolean = status201 && matchingUsername && existingId;

    if (isOk)
      this.router.navigate(['onboarding/confirmation']);
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
