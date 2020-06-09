import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { AddressDetailsComponent } from '../address-details.component';
import { OnboardingComponent } from '../../onboarding.component';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent extends OnboardingComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.step = 10;
    this.previousPath = "9/city";
    this.nextPath = "validation";
  }
}
