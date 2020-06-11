import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './first-name.component.css']
})
export class FirstNameComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 3;
    this.stepName = "Quel est votre prénom ?";
    this.previousPath = "2/email";
    this.nextPath = "4/lastname";
  }
}
