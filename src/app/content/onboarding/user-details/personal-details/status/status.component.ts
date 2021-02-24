import { profileOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['../../../onboarding.component.css', './status.component.css']
})
export class StatusComponent extends StepForm {
  readonly tiles: string[] = ['individual', 'professionnal'];
  additionalControls: boolean;
  user: User;
  form: FormGroup;

  constructor(
    public formData: FormDataService,
    public formBuilder: FormBuilder)
  {
    super(profileOnboarding, 'status');
    this.formData.fieldName = "status";
    !this.formData.user.username ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.additionalControls = this.user.userProfile.type !== null ? true : false;
    this.stepName = "Particulier ou professionnel ?";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.user.userProfile.type !== null) {
      this.setFocus(this.user.userProfile.type);
    }
  }

  public setFocus(tileId: string): void {
    if (!document.getElementById(tileId).classList.contains('chosen-tile')) {
      document.getElementById(tileId).classList.add('chosen-tile');
    }
  }

  public handleStatus(status: string): void {
    this.user.userProfile.type = status;
    this.path.next = this.user.userProfile.type === 'professional' ? profileOnboarding.steps[this.stepNb] : profileOnboarding.steps[this.stepNb + 1];
    this.additionalControls = true;
    this.nextOn = true;
  }
}
