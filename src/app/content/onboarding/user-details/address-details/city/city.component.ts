import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['../../../onboarding.component.css', './city.component.css']
})
export class CityComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 10;
    this.stepName = "Quelle est votre ville ?";
    this.previousPath = "9/zipcode";
    this.nextPath = "11/street";
  }
}
