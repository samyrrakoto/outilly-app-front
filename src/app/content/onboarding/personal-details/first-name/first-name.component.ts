import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { PersonalDetailsComponent } from '../personal-details.component';
import { Router } from '@angular/router';
import { UserComponent } from '../../user/user.component';

@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['./first-name.component.css']
})
export class FirstNameComponent extends UserComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.step = 3;
    this.previousPath = "2/email";
    this.nextPath = "4/lastname";
  }
}
