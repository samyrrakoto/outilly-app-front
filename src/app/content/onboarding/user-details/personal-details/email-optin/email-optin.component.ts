import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { OnboardingManagerService } from 'src/app/services/onboarding-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-optin',
  templateUrl: './email-optin.component.html',
  styleUrls: ['../../../onboarding.component.css', './email-optin.component.css']
})
export class EmailOptinComponent extends StepForm {
  loading: boolean = false;
  additionalControls: boolean = false;
  user: User;

  constructor(
    public formData: FormDataService,
    private onboardingManager: OnboardingManagerService,
    private auth: AuthService,
    private router: Router)
  {
    super(accountOnboarding, 'emailoptin');
    !this.formData.user.username ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.additionalControls = this.user.userProfile.emailOptin !== null ? true : false;
    this.stepName = "Souhaitez-vous recevoir notre newsletter ?";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.user.userProfile.emailOptin !== null) {
      this.user.userProfile.emailOptin ? this.setFocus('yes') : this.setFocus('no');
    }
  }

  public setFocus(tileId: string): void {
    if (!document.getElementById(tileId).classList.contains('chosen-tile')) {
      document.getElementById(tileId).classList.add('chosen-tile');
    }
  }

  public handleChoice(choice: boolean): void {
    this.user.userProfile.emailOptin = choice;
  }

  public submit(): void {
    this.loading = true;
    this.onboardingManager.createAccount(this.formData.user)
      .then(() => this.auth.login(this.getCredentials()))
      .then(() => this.router.navigate(['/onboarding']))
      .then(() => this.loading = false)
      .catch(() => this.loading = false);
  }

    private getCredentials(): any {
    return {
      "username": this.formData.user.userProfile.email,
      "password": this.formData.user.password
    }
  }
}
