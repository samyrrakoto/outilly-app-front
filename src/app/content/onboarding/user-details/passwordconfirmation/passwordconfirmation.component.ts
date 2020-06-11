import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../onboarding.component';

@Component({
  selector: 'app-passwordconfirmation',
  templateUrl: './passwordconfirmation.component.html',
  styleUrls: ['../../onboarding.component.css', './passwordconfirmation.component.css']
})
export class PasswordconfirmationComponent extends OnboardingComponent {
  password2: string;

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 14;
    this.stepName = "Confirmez votre mot de passe";
    this.previousPath = "13/password";
    this.nextPath = "15/emailoptin";
    this.password2 = "";
  }
}
