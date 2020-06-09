import { Component } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../onboarding.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(public formDataService: FormDataService, public router: Router, public http: HttpClient)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.formDataService.filled = true;
  }

  postData(data) {
    this.http
        .post<any>("http://ktkp.api/user/create", data, this.httpOptions)
        .subscribe(response => {
          console.log(response)});
  }

  submit(): void {
    let data = JSON.stringify(this.formDataService);
    this.postData(data);
    this.goTo("confirmation");
  }
}
