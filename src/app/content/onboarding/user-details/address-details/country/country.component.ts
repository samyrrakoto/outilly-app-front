import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { country } from 'src/app/parameters';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['../../../onboarding.component.css', './country.component.css']
})
export class CountryComponent extends StepForm {
  readonly root: string = '/onboarding/';
  readonly totalNbSteps: number = accountOnboarding.length;
  user: User;
  form: FormGroup;
  countriesAccepted: any[] = country.COUNTRIES_ACCEPTED;

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super();
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = this.formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = 'country';
    this.stepNb = this.findAccountStepNb('country');
    this.stepName = 'Votre pays ?';
    this.path.current = accountOnboarding[this.stepNb - 1];
    this.path.previous = accountOnboarding[this.stepNb - 2];
    this.path.next = accountOnboarding[this.stepNb];
    this.stepNb -= this.findSubStepsNb('country');
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    this.setFocus(this.user.userProfile.mainAddress.country.name);
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      country: [this.user.userProfile.mainAddress.country, [Validators.required]],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  public setCountry(country: any) {
    this.user.userProfile.mainAddress.country.name = country.label;
    this.user.userProfile.mainAddress.country.isoCode = country.isocode;
  }

  public setFocus(tileId: string): void {
    if (!document.getElementById(tileId).classList.contains('chosen-tile')) {
      document.getElementById(tileId).classList.add('chosen-tile');
    }
  }
}
