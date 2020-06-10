import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent extends OnboardingComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.step = 8;
    this.previousPath = "7/birthdate";
    this.nextPath = "9/zipcode";
  }
}
