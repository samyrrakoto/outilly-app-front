import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['../../../onboarding.component.css', './city.component.css']
})
export class CityComponent extends StepForm {
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
    this.formDataService.fieldName = 'city';
    this.stepNb = this.findAccountStepNb('city');
    this.stepName = 'Votre ville ?';
    this.stepSubtitle = "Cela restera (toujours) confidentiel. ;-)";
    this.path.current = accountOnboarding[this.stepNb - 1];
    this.path.previous = accountOnboarding[this.stepNb - 2];
    this.path.next = accountOnboarding[this.stepNb];
    this.stepNb -= this.findSubStepsNb('city');
    this.placeholder = 'Jouy-en-Josas';
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const city: HTMLElement = document.getElementById('city');

    if (city !== null) {
      city.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      city: [this.user.userProfile.mainAddress.city, [Validators.required]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
