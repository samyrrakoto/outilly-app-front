import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['../../../onboarding.component.css', './street.component.css']
})
export class StreetComponent extends StepForm {
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
    this.user = this.formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "street";
    this.stepNb = this.findAccountStepNb('street');
    this.stepName = "Complétez votre adresse...";
    this.stepSubtitle = "Cela restera (encore plus) confidentiel. ;-)";
    this.path.current = accountOnboarding[this.stepNb - 1];
    this.path.previous = accountOnboarding[this.stepNb - 2];
    this.path.next = accountOnboarding[this.stepNb];
    this.stepNb -= this.findSubStepsNb('street');
    this.placeholder = "123 bis rue des acacias";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    const line1: HTMLElement = document.getElementById('line1');

    if (line1 !== null) {
      line1.focus();
    }
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      line1: [this.user.userProfile.mainAddress.line1, [Validators.required, Validators.minLength(3)]],
    });
  }

  public get controls() {
    return this.form.controls;
  }
}
