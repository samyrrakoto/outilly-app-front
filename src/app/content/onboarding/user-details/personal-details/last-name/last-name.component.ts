import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-last-name',
  templateUrl: './last-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './last-name.component.css']
})
export class LastNameComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 4;
    this.stepName = "Quel est votre nom ?";
    this.previousPath = "3/firstname";
    this.nextPath = "5/gender";
  }
}
