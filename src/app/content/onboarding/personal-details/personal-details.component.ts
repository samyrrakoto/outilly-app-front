import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../../models/user-profile';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  userProfile : UserProfile;
  readonly root = "onboarding/personaldetails/";

  constructor(public formDataService : FormDataService, public router : Router)
  {
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
