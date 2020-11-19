import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['../../../onboarding.component.css', './street.component.css']
})
export class StreetComponent extends OnboardingComponent {
  @ViewChild('street') street: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.user = this.formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "street";
    this.stepNb = 11;
    this.stepName = "Quelle est votre adresse postale ?";
    this.formDataService.path.previous = "10/city";
    this.formDataService.path.next = "12/phonenumber";
    this.placeholder = "(ex : 123 bis rue des acacias)";
  }

  ngAfterViewInit(): void {
    this.street.nativeElement.focus();
  }
}
