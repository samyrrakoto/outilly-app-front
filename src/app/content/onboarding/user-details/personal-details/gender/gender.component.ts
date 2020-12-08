import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
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
  user: User;
  form: FormGroup;

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
    this.stepNb = 4;
    this.stepName = "Quel est votre genre ?";
    this.path.current = "4/gender";
    this.path.previous = "3/lastname";
    this.path.next = "5/status";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('gender').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      gender: [this.user.userProfile.gender, [Validators.required]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
