import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-email-optin',
  templateUrl: './email-optin.component.html',
  styleUrls: ['../../../onboarding.component.css', './email-optin.component.css']
})
export class EmailOptinComponent extends StepForm {
  additionalControls: boolean;
  user: User;

  constructor(
    public formData: FormDataService)
  {
    super(accountOnboarding, 'emailoptin');
    !this.formData.user.username ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.additionalControls = this.user.userProfile.emailOptin !== null ? true : false;
    this.stepName = "Souhaitez-vous recevoir notre newsletter ?";
    this.isMandatory = false;
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
}
