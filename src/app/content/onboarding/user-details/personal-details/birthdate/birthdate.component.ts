import { profileOnboarding } from 'src/app/onboardings';
import { user } from 'src/app/parameters';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { User } from 'src/app/models/user';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StepForm } from 'src/app/models/step-form';

@Component({
  selector: 'app-birthdate',
  templateUrl: './birthdate.component.html',
  styleUrls: ['../../../onboarding.component.css', './birthdate.component.css']
})
export class BirthdateComponent extends StepForm {
  @ViewChild('birthdate') birthdate: ElementRef;
  user: User = new User();
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public formBuilder: FormBuilder)
  {
    super(profileOnboarding, 'birthdate');
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepName = "Votre date de naissance ?";
    this.path.previous = this.user.userProfile.type === 'professional' ? profileOnboarding.steps[this.stepNb - 2] : profileOnboarding.steps[this.stepNb - 3];
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    if (this.birthdate.nativeElement !== null) {
      this.birthdate.nativeElement.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      birthdate: [this.user.userProfile.birthdate, [Validators.required, this.major(), , this.alive(), this.notEmpty()]],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  private major(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
      {
        return this.getAge(control.value) >= user.MIN_AGE ? null : {notMajor: control.value};
      }
  }

  private alive(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>
    {
      return this.getAge(control.value) <= user.MAX_AGE ? null : {notAlive: control.value};
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
