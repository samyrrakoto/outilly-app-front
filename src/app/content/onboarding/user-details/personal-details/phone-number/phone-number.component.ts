import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['../../../onboarding.component.css', './phone-number.component.css']
})
export class PhoneNumberComponent extends OnboardingComponent {
  @ViewChild('phoneNumber') phoneNumber: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "phoneNumber";
    this.stepNb = 12;
    this.stepName = "Quel est votre numéro de téléphone ?";
    this.isMandatory = false;
    this.formDataService.path.current = '12/phonenumber';
    this.formDataService.path.previous = "11/street";
    this.formDataService.path.next = "13/password";
    this.placeholder = "(ex : 0701020304)";
  }

  ngAfterViewInit(): void {
    this.phoneNumber.nativeElement.focus();
  }
}
