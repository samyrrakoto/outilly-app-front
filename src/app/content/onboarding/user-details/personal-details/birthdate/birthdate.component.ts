import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { User } from 'src/app/models/user';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-birthdate',
  templateUrl: './birthdate.component.html',
  styleUrls: ['../../../onboarding.component.css', './birthdate.component.css']
})
export class BirthdateComponent extends StepForm {
  readonly root: string = '/onboarding/';
  readonly totalNbSteps: number = accountOnboarding.length;
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
    this.formDataService.fieldName = "birthdate";
    this.stepNb = this.findAccountStepNb('birthdate');
    this.stepName = "Votre date de naissance ?";
    this.path.current = accountOnboarding[this.stepNb - 1];
    this.path.previous = this.user.userProfile.type === 'professional' ? accountOnboarding[this.stepNb - 2] : accountOnboarding[this.stepNb - 5];
    this.path.next = accountOnboarding[this.stepNb];
    this.stepNb -= this.findSubStepsNb('birthdate');
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const birthdate: HTMLElement = document.getElementById('birthdate');

    if (birthdate !== null) {
      birthdate.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      birthdate: [this.user.userProfile.birthdate, [Validators.required, this.major(), this.notEmpty()]],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private major(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        return this.getAge(control.value) >= 18 ? null : {notMajor: control.value};
      }
  }

  private notEmpty(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        return this.user.userProfile.birthdate !== 0 ? null : {notNull: control.value};
      }
  }

  private getAge(date: string): number {
    const currentYear: number = new Date(Date.now()).getFullYear();
    const currentMonth: number = new Date(Date.now()).getMonth();
    const currentDay: number = new Date(Date.now()).getDate();
    const userYear: number = new Date(Date.parse(date)).getFullYear();
    const userMonth: number = new Date(Date.parse(date)).getMonth();
    const userDay: number = new Date(Date.parse(date)).getDate();
    const gapDay: number = currentDay - userDay;
    const gapMonth: number = gapDay < 0 ? (currentMonth - userMonth) - 1 : currentMonth - userMonth;
    const gapYear: number = gapMonth < 0 ? (currentYear - userYear) - 1 : currentYear - userYear;

    return gapYear;
  }
}
