import { StepForm } from './../../../../../models/step-form';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../../onboarding.component.css', './email.component.css']
})
export class EmailComponent extends StepForm {
  @ViewChild('email') email: ElementRef;
  readonly root: string = 'onboarding/';
  user: User = new User();
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super();
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "email";
    this.user = formDataService.user;
    this.stepNb = 1;
    this.stepName = "Quelle est votre adresse e-mail ?";
    this.formDataService.path.current = "1/email";
    this.formDataService.path.previous = "";
    this.formDataService.path.next = "3/firstname";
    this.placeholder = "jeanmarc78@aol.fr";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('email').focus();
  }

  ngOnChanges() {
    if (this.formDataService) {
      !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      mail: [this.user.userProfile.email, [Validators.required, Validators.email]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
