import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { PersonalDetailsComponent } from '../personal-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-name',
  templateUrl: './last-name.component.html',
  styleUrls: ['./last-name.component.css']
})
export class LastNameComponent extends PersonalDetailsComponent {
  
  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
  }
}
