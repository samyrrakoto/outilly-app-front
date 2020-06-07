import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { PersonalDetails } from '../../../models/personal-details';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetails : PersonalDetails;
  readonly root = "onboarding/personaldetails/";

  constructor(public formDataService : FormDataService, public router : Router)
  {
    this.personalDetails = formDataService.personalDetails;
  }

  ngOnInit(): void {
  }

  goTo(route : string)
  {
    let path = this.root + route;
    this.router.navigateByUrl(path);
  }

  nextPart()
  {
    this.router.navigateByUrl("onboarding/addressdetails");
  }
}
