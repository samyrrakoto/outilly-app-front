import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../onboarding.component';

@Component({
  selector: 'app-passwordconfirmation',
  templateUrl: './passwordconfirmation.component.html',
  styleUrls: ['./passwordconfirmation.component.css']
})
export class PasswordconfirmationComponent extends OnboardingComponent {
  password2: string;

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.step = 14;
    this.previousPath = "13/password";
    this.nextPath = "15/emailoptin";
    this.password2 = "";
  }
}
