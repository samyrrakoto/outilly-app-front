import { specialCharacters } from './../../../../parameters';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../../onboarding.component.css', './password.component.css']
})
export class PasswordComponent extends StepForm {
  readonly root: string = '/onboarding/';
  readonly acceptedSpecialCharacters: string = specialCharacters;
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
    this.formDataService.fieldName = "pwd";
    this.stepNb = 12;
    this.stepName = "Créez un mot de passe sécurisé";
    this.path.current = "12/password";
    this.path.previous = "11/phonenumber";
    this.path.next = "13/passwordconfirmation";
    this.placeholder = "AuMoins7Caracteres";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('password').focus();
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      password: [this.user.password, [Validators.required, this.validFormat()]],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private validFormat(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        const longEnough: boolean = control.value.length >= 7;
        const containsUpper: boolean = this.containsUpper(control.value);
        const containsLower: boolean = this.containsLower(control.value);
        const containsDigit: boolean = this.containsDigit(control.value);
        const containsSpecialCharacter: boolean = this.containsSpecial(control.value);

        const verifications: boolean = longEnough && containsUpper && containsLower && containsDigit && containsSpecialCharacter;
        return verifications ? null : {notCorrect: control.value};
      }
  }

  private containsUpper(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "A".charCodeAt(0) && c.charCodeAt(0) <= "Z".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  private containsLower(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "a".charCodeAt(0) && c.charCodeAt(0) <= "z".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  private containsDigit(str: string): boolean {
    for (const c of str) {
      if (c.charCodeAt(0) >= "0".charCodeAt(0) && c.charCodeAt(0) <= "9".charCodeAt(0)) {
        return true;
      }
    }
    return false;
  }

  private containsSpecial(str: string): boolean {
    for (const c of str) {
      for (const specialChar of specialCharacters) {
        if (c === specialChar) {
          return true;
        }
      }
    }
    return false;
  }
}
