import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-email-optin',
  templateUrl: './email-optin.component.html',
  styleUrls: ['../../../onboarding.component.css', './email-optin.component.css']
})
export class EmailOptinComponent extends OnboardingComponent {
  
  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 15;
    this.stepName = "Souhaitez-vous recevoir notre newsletter ?";
    this.isMandatory = false;
    this.previousPath = "14/passwordconfirmation";
    this.nextPath = "validation";
  }
}
