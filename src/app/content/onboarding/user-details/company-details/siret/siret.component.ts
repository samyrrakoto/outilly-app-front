import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { StatusComponent } from '../../personal-details/status/status.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-siret',
  templateUrl: './siret.component.html',
  styleUrls: ['../../../onboarding.component.css', './siret.component.css']
})
export class SiretComponent extends StatusComponent {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = "siret";
    this.stepName = "Quel est votre numéro SIRET ?";
    this.formDataService.path.previous = "6/status";
    this.formDataService.path.current = "6/status/siret";
    this.formDataService.path.next = "6/status/tva";
  }
}
