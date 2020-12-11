import { accountOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['../../../onboarding.component.css', './status.component.css']
})
export class StatusComponent extends StepForm {
  readonly root: string = '/onboarding/';
  readonly tiles: string[] = ['individual', 'professionnal'];
  user: User;
  form: FormGroup;

  constructor(
    public formDataService: FormDataService,
    public router: Router,
    public formValidatorService: FormValidatorService,
    public formBuilder: FormBuilder)
  {
    super();
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "status";
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepNb = this.findAccountStepNb('status');
    this.stepName = "Particulier ou professionnel ?";
    this.path.current = accountOnboarding[this.stepNb - 1];
    this.path.previous = accountOnboarding[this.stepNb - 2];
    this.path.next = accountOnboarding[this.stepNb + 3];
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    this.setFocus(this.user.userProfile.type);
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      status: [this.user.userProfile.type, [Validators.required]],
    });
  }

  public get controls() {
    return this.form.controls;
  }

  public setFocus(tileId: string): void {
    if (!document.getElementById(tileId).classList.contains('chosen-tile')) {
      document.getElementById(tileId).classList.add('chosen-tile');
    }
  }

  public handleStatus(): void {
    this.user.userProfile.type === 'professional' ? this.path.next = accountOnboarding[this.stepNb] : null;
  }
}
