import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {
  address: Address;
  readonly root = "onboarding/addressdetails/";

  constructor(public formDataService: FormDataService, public router: Router)
  {
  }

  ngOnInit()
  {}

  goTo(route: string)
  {
    let path = this.root + route;
    this.router.navigateByUrl(path);
  }

  previousPart()
  {
    this.router.navigateByUrl("onboarding/personaldetails/status");
  }

  nextPart()
  {
    this.router.navigateByUrl("onboarding/validation");
  }
}
