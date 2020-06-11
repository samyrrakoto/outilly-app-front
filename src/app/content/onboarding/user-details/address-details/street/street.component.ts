import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['../../../onboarding.component.css', './street.component.css']
})
export class StreetComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 11;
    this.stepName = "Quelle est votre adresse postale ?";
    this.previousPath = "10/city";
    this.nextPath = "12/phonenumber";
  }
}
