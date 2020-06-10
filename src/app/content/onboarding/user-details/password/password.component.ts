import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../onboarding.component';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../../onboarding.component.css', './password.component.css']
})
export class PasswordComponent extends OnboardingComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 13;
    this.stepName = "Créez un mot de passe sécurisé";
    this.previousPath = "12/phonenumber";
    this.nextPath = "14/passwordconfirmation";
  }
}
