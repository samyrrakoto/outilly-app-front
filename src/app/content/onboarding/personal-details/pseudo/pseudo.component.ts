import { Component } from '@angular/core';
import { PersonalDetailsComponent } from '../personal-details.component';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['./pseudo.component.css']
})
export class PseudoComponent extends PersonalDetailsComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
  }
}
