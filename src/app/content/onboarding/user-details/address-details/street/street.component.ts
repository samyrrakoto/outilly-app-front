import { Component, ViewChild, ElementRef } from '@angular/core';
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
    this.stepNb = 10;
    this.stepName = "Adresse postale complète ?";
    this.path.current = '10/street';
    this.path.previous = "9/city";
    this.path.next = "11/phonenumber";
    this.placeholder = "123 bis rue des acacias";
  }

  ngOnInit(): void {
    this.getForm();
  }

  ngAfterViewInit(): void {
    document.getElementById('line1').focus();
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
