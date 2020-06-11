import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { StatusComponent } from '../../personal-details/status/status.component';

@Component({
  selector: 'app-siret',
  templateUrl: './siret.component.html',
  styleUrls: ['../../../onboarding.component.css', './siret.component.css']
})
export class SiretComponent extends StatusComponent {

  constructor(public formDataService: FormDataService, public router: Router) {
    super(formDataService, router);
    this.user = formDataService.user;
    this.stepName = "Quel est votre numéro SIRET ?";
    this.previousPath = "6/status";
    this.nextPath = "6/status/tva";
  }
}
