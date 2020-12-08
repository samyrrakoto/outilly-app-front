import { Component, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-first-name',
  templateUrl: './first-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './first-name.component.css']
})
export class FirstNameComponent extends OnboardingComponent implements OnChanges {

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "firstname";
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepNb = 2;
    this.stepName = "Quel est votre prénom ?";
    this.formDataService.path.current = "2/firstname";
    this.formDataService.path.previous = "1/email";
    this.formDataService.path.next = "4/lastname";
    this.placeholder = "Jean Marc)";
  }

  ngOnChanges() {}

  ngAfterViewInit(): void {
  }
}
