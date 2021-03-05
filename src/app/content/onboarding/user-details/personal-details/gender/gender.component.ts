import { profileOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['../../../onboarding.component.css', './gender.component.css']
})
export class GenderComponent extends StepForm {
  additionalControls: boolean;
  user: User;
  form: FormGroup;
  readonly tiles: string[] = ['male', 'female'];

  constructor(
    public formData: FormDataService,
    public formBuilder: FormBuilder)
  {
    super(profileOnboarding, 'gender');
    this.formData.fieldName = "gender";
    !this.formData.user ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.additionalControls = this.user.userProfile.gender !== null ? true : false;
    this.stepName = "Vous êtes un(e)...";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.user.userProfile.gender !== null) {
      this.setFocus(this.user.userProfile.gender);
    }
  }

  public setFocus(tileId: string): void {
    if (!document.getElementById(tileId).classList.contains('chosen-tile')) {
      document.getElementById(tileId).classList.add('chosen-tile');
    }
  }
}
