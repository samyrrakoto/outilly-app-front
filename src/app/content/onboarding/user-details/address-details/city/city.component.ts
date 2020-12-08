import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
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
    this.stepNb = 9;
    this.stepName = 'Quelle est votre ville ?';
    this.path.current = '9/city';
    this.path.previous = '8/zipcode';
    this.path.next = '10/street';
    this.placeholder = 'Jouy-en-Josas';
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('city').focus();
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
