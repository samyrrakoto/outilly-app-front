import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['../../../onboarding.component.css', './status.component.css']
})
export class StatusComponent extends OnboardingComponent {
  @ViewChild('status') status: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "status";
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.stepNb = 6;
    this.stepName = "Quel est votre statut ?";
    this.formDataService.path.current = "6/status";
    this.formDataService.path.previous = "5/gender";
    this.formDataService.path.next = "7/birthdate";
  }

  ngAfterViewInit(): void {}
}
