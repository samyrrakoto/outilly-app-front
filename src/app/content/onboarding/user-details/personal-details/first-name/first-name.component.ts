import { profileOnboarding } from 'src/app/onboardings';
import { StepForm } from 'src/app/models/step-form';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './first-name.component.css']
})
export class FirstNameComponent extends StepForm {
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
    this.formDataService.fieldName = "firstname";
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepName = "Votre prénom ?";
    this.stepSubtitle = 'Car vous n\'êtes pas un numéro. ;-)';
    this.placeholder = "Jean Marc";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const firstname: HTMLElement = document.getElementById('firstname');

    if (firstname !== null) {
      firstname.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      firstname: [this.user.userProfile.firstname, [Validators.required]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
