import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { PersonalDetails } from '../../../models/personal-details';
import { OnboardingComponent } from '../onboarding.component';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personalDetails : PersonalDetails;

constructor(private formDataService : FormDataService)
{
  this.personalDetails = formDataService.personalDetails;
}

  ngOnInit(): void {
  }
}
