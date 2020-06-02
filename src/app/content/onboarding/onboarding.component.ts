import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  constructor(private formDataService : FormDataService) {
  }

  ngOnInit(): void {
  }
}
