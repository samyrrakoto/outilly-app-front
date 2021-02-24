import { StepForm } from 'src/app/models/step-form';
import { accountOnboarding } from 'src/app/onboardings';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
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
  readonly externalControl: boolean = true;
  error: string[] = [];
  user: User = new User();
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super(accountOnboarding, 'email');
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "email";
    this.formDataService.fieldName = "usernameExistence";
    this.user = formDataService.user;
    this.stepName = "Votre adresse e-mail ?";
    this.stepSubtitle = 'Elle vous servira pour vous connecter.';
    this.placeholder = "jeanmarc78@aol.fr";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    if (this.email.nativeElement !== null) {
      this.email.nativeElement.focus();
    }
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
