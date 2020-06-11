import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-birthdate',
  templateUrl: './birthdate.component.html',
  styleUrls: ['../../../onboarding.component.css', './birthdate.component.css']
})
export class BirthdateComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 7;
    this.stepName = "Quelle est votre date de naissance ?";
    this.previousPath = "6/status";
    this.nextPath = "8/country";
  }
}
