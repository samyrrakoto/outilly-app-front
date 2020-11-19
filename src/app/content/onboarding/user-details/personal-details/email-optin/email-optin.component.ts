import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-email-optin',
  templateUrl: './email-optin.component.html',
  styleUrls: ['../../../onboarding.component.css', './email-optin.component.css']
})
export class EmailOptinComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "emailOptin";
    this.stepNb = 15;
    this.stepName = "Souhaitez-vous recevoir notre newsletter ?";
    this.isMandatory = false;
    this.formDataService.path.previous = "14/passwordconfirmation";
    this.formDataService.path.next = "validation";
    this.formDataService.user.userProfile.emailOptin = false;
  }
}
