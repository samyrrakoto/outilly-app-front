import { Component } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-optin',
  templateUrl: './email-optin.component.html',
  styleUrls: ['../../../onboarding.component.css', './email-optin.component.css']
})
export class EmailOptinComponent extends StepForm {
  readonly root: string = '/onboarding/';
  user: User;
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super();
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "emailOptin";
    this.stepNb = 14;
    this.stepName = "Souhaitez-vous recevoir notre newsletter ?";
    this.isMandatory = false;
    this.path.previous = "14/emailoptin";
    this.path.previous = "13/passwordconfirmation";
    this.path.next = "validation";
    this.user.userProfile.emailOptin = false;
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    this.user.userProfile.emailOptin ? this.setFocus('yes') : this.setFocus('no');
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      emailOptin: [this.user.userProfile.emailOptin, []],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  public setFocus(tileId: string): void {
    if (!document.getElementById(tileId).classList.contains('chosen-tile')) {
      document.getElementById(tileId).classList.add('chosen-tile');
    }
  }
}
