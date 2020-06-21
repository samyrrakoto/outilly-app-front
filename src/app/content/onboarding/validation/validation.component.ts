import { Component } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../onboarding.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent extends OnboardingComponent {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
        }
    )
  };

  constructor(public formDataService: FormDataService, public router: Router, formValidatorService: FormValidatorService, public http: HttpClient) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
  }

  postData(data) {
    this.http
        .post<any>("http://ktkp.api/user/create", data, this.httpOptions)
        .subscribe(response => {
          console.log(response)});
  }

  submit(): void {
    let data = JSON.stringify(this.formDataService);
    console.log(data);
    this.postData(data);
    this.goTo("confirmation");
  }
}
