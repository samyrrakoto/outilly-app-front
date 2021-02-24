import { OnboardingManagerService } from 'src/app/services/onboarding-manager.service';
import { StringToolboxService } from 'src/app/services/string-toolbox.service';
import { Component, OnInit } from '@angular/core';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { FormDataService } from 'src/app/services/form-data.service';
import { GenericComponent } from 'src/app/models/generic-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent extends GenericComponent implements OnInit {
  user: User = new User();
  public loading: boolean = false;

  constructor(
    public formDataService: FormDataService,
    public formValidatorService: FormValidatorService,
    public strToolbox: StringToolboxService,
    private onboardingManager: OnboardingManagerService,
    private router: Router)
  {
    super();
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = this.formDataService.user;
  }

  ngOnInit() {
    this.formDataService.isAccountComplete = true;
  }

  public submit(): void {
    this.onboardingManager.submitProfile(this.formDataService.user)
      .then(() => {
        this.router.navigate(['onboarding/confirmation'])
      })
      .catch();
  }
}
