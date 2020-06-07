import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { AddressDetailsComponent } from '../address-details.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent extends AddressDetailsComponent {

  constructor(public formDataService : FormDataService, public router : Router)
  {
    super(formDataService, router);
  }
}
