import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['../../../onboarding.component.css', './gender.component.css']
})
export class GenderComponent extends StepForm {
  readonly root: string = '/onboarding/';
  additionalControls: boolean;
  readonly totalNbSteps: number = accountOnboarding.length;
  user: User;
  form: FormGroup;
  readonly tiles: string[] = ['male', 'female'];

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super();
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "gender";
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.additionalControls = this.user.userProfile.gender !== null ? true : false;
    this.stepNb = this.findAccountStepNb('gender');
    this.stepName = "Vous êtes un(e)...";
    this.path.current = accountOnboarding[this.stepNb - 1];
    this.path.previous = accountOnboarding[this.stepNb - 2];
    this.path.next = accountOnboarding[this.stepNb];
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
