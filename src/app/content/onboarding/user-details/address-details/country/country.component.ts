import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['../../../onboarding.component.css', './country.component.css']
})
export class CountryComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = this.formDataService.user;
    console.log(this.formDataService);
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = 'country';
    this.stepNb = 8;
    this.stepName = 'Quel est votre pays ?';
    this.formDataService.path.previous = '7/birthdate';
    this.formDataService.path.next = '9/zipcode';
  }
}
