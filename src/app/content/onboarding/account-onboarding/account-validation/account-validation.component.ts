import { OnboardingManagerService } from 'src/app/services/onboarding-manager.service';
import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'src/app/models/generic-component';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-validation',
  templateUrl: './account-validation.component.html',
  styleUrls: ['./account-validation.component.css']
})
export class AccountValidationComponent extends GenericComponent implements OnInit {
  loading: boolean = false;
  conditionsAccepted: boolean = false;

  constructor(
    public formData: FormDataService,
    private router: Router,
    private auth: AuthService,
    public onboardingManager: OnboardingManagerService)
  {
    super();
  }

  ngOnInit(): void {
  }

  public submit(): void {
    this.loading = true;

    this.onboardingManager.createAccount(this.formData.user)
      .then(() => this.auth.login(this.getCredentials()))
      .then(() => this.router.navigate(['/onboarding']))
      .catch(() => this.loading = false);
  }

  public changeConditionsStatus(): void {
    this.conditionsAccepted = !this.conditionsAccepted;
  }

  private getCredentials(): any {
    return {
      "username": this.formData.user.userProfile.email,
      "password": this.formData.user.password
    }
  }
}
