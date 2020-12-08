import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-passwordconfirmation',
  templateUrl: './passwordconfirmation.component.html',
  styleUrls: ['../../onboarding.component.css', './passwordconfirmation.component.css']
})
export class PasswordconfirmationComponent extends StepForm {
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
    this.formDataService.fieldName = "pwdConfirmation";
    this.stepNb = 13;
    this.stepName = "Confirmez votre mot de passe";
    this.path.current = "13/passwordconfirmation";
    this.path.previous = "12/password";
    this.path.next = "14/emailoptin";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('passwordConfirmation').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      passwordConfirmation: [this.user.passwordConfirmation, [Validators.required, this.pwdMatching()]],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private pwdMatching(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const verifications: boolean = this.user.password === control.value;

        return verifications ? null : {notMatching: control.value};
      }
  }
}
