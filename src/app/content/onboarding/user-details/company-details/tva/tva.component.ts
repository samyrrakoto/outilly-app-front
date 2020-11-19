import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { StatusComponent } from '../../personal-details/status/status.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-tva',
  templateUrl: './tva.component.html',
  styleUrls: ['../../../onboarding.component.css', './tva.component.css']
})
export class TvaComponent extends StatusComponent {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "tva";
    this.stepName = "Quel est votre numéro de TVA communautaire ?";
    this.formDataService.path.previous = "6/status/siret";
    this.formDataService.path.current = "6/status/tva";
    this.formDataService.path.next = "7/birthdate";
  }
}
