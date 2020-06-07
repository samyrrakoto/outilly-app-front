import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { PersonalDetailsComponent } from '../personal-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent extends PersonalDetailsComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
  }
}
