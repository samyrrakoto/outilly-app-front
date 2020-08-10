import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['../../../onboarding.component.css', './city.component.css']
})
export class CityComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = 'city';
    this.stepNb = 10;
    this.stepName = 'Quelle est votre ville ?';
    this.formDataService.path.previous = '9/zipcode';
    this.formDataService.path.next = '11/street';
    this.placeholder = '(ex : Jouy-en-Josas)';
  }
}
