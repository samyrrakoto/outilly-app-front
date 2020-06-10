import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { StatusComponent } from '../../personal-details/status/status.component';

@Component({
  selector: 'app-tva',
  templateUrl: './tva.component.html',
  styleUrls: ['./tva.component.css']
})
export class TvaComponent extends StatusComponent {

  constructor(public formDataService: FormDataService, public router: Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.previousPath = "6/status/siret";
    this.nextPath = "7/birthdate";
  }
}
