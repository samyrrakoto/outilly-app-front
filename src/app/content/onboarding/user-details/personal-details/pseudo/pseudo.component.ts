import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['../../../onboarding.component.css', './pseudo.component.css']
})
export class PseudoComponent extends OnboardingComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepNb = 1;
    this.stepName = "Créez un identifiant de connexion";
    this.previousPath = "";
    this.nextPath = "2/email";
  }
}
