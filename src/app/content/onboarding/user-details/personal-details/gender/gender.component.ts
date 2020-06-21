import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['../../../onboarding.component.css', './gender.component.css']
})
export class GenderComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = "gender";
    this.user = formDataService.user;
    this.stepNb = 5;
    this.stepName = "Quel est votre genre ?";
    this.formDataService.path.previous = "4/lastname";
    this.formDataService.path.next = "6/status";
  }
}
