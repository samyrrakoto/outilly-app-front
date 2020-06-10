import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['../../../onboarding.component.css', './zipcode.component.css']
})
export class ZipcodeComponent extends OnboardingComponent {
  
  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 9;
    this.stepName = "Quel est votre code postal ?";
    this.previousPath = "8/country";
    this.nextPath = "10/city";
  }
}
