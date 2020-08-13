import { Component, OnChanges } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['../../../onboarding.component.css', './pseudo.component.css']
})
export class PseudoComponent extends OnboardingComponent implements OnChanges {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService, public request: RequestService) {
    super(formDataService, router, formValidatorService);
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = "userName";
    this.user = formDataService.user;
    this.stepNb = 1;
    this.stepName = "Créez un identifiant de connexion";
    this.formDataService.path.previous = "1/username";
    this.formDataService.path.next = "2/email";
    this.placeholder = "(ex : JeanMarc78)";
  }

  ngOnChanges() {
  }
}
