import { Component } from '@angular/core';
import { PersonalDetailsComponent } from '../personal-details.component';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent extends PersonalDetailsComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
  }
}
