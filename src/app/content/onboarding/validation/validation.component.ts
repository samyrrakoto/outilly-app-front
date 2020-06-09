import { Component } from '@angular/core';
import { FormDataService } from '../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../onboarding.component';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent extends OnboardingComponent {

  constructor(public formDataService: FormDataService, public router: Router)
  {
    super(formDataService, router);
    this.user = formDataService.user;
    this.formDataService.filled = true;
  }

  submit(): void {
    let data = JSON.stringify(this.formDataService);
    console.log(data);
  }
}
