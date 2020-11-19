import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-last-name',
  templateUrl: './last-name.component.html',
  styleUrls: ['../../../onboarding.component.css', './last-name.component.css']
})
export class LastNameComponent extends OnboardingComponent {
  @ViewChild('lastName') lastName: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "lastname";
    this.user = formDataService.user;
    this.stepNb = 4;
    this.stepName = "Quel est votre nom ?";
    this.formDataService.path.previous = "3/firstname";
    this.formDataService.path.next = "5/gender";
  }

  ngAfterViewInit(): void {
    this.lastName.nativeElement.focus();
  }
}
