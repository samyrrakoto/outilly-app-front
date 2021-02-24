import { profileOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-last-name',
  templateUrl: './last-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './last-name.component.css']
})
export class LastNameComponent extends StepForm {
  user: User;
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super(profileOnboarding);
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "lastname";
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepName = "Et votre nom ?";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const lastname: HTMLElement = document.getElementById('lastname');

    if (lastname !== null) {
      lastname.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      lastname: [this.user.userProfile.lastname, [Validators.required]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
