import { Component, OnInit } from '@angular/core';
import { AddressDetails } from '../../../models/address-details';
import { FormDataService } from '../../../services/form-data.service';
import { OnboardingComponent } from '../onboarding.component';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {
  addressDetails : AddressDetails;

  constructor(private formDataService : FormDataService)
  {
    this.addressDetails = formDataService.addressDetails;
  }

  ngOnInit()
  {}

  submit()
  {
    this.formDataService.postData();
  }
}
