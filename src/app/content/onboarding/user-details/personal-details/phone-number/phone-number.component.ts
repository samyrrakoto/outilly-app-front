import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['../../../onboarding.component.css', './phone-number.component.css']
})
export class PhoneNumberComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 12;
    this.stepName = "Quel est votre numéro de téléphone ?";
    this.isMandatory = false;
    this.previousPath = "11/street";
    this.nextPath = "13/password";
  }
}
