import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { PersonalDetailsComponent } from '../personal-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent extends PersonalDetailsComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
  }
}
