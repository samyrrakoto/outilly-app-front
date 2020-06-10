import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../../onboarding.component.css', './email.component.css']
})
export class EmailComponent extends OnboardingComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 2;
    this.stepName = "Quelle est votre adresse e-mail ?";
    this.previousPath = "1/username";
    this.nextPath = "3/firstname";
  }
}
