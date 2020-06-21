import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-birthdate',
  templateUrl: './birthdate.component.html',
  styleUrls: ['../../../onboarding.component.css', './birthdate.component.css']
})
export class BirthdateComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = "birthdate";
    this.stepNb = 7;
    this.stepName = "Quelle est votre date de naissance ?";
    this.formDataService.path.previous = "6/status";
    this.formDataService.path.next = "8/country";
  }
}
