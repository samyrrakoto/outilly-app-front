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
    this.formDataService.fieldName = "firstname";
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepNb = 2;
    this.stepName = "Quel est votre prénom ?";
    this.path.current = "2/firstname";
    this.path.previous = "1/email";
    this.path.next = "3/lastname";
    this.placeholder = "Jean Marc";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('firstname').focus();
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
