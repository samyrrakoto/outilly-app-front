import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['../../../onboarding.component.css', './zipcode.component.css']
})
export class ZipcodeComponent extends OnboardingComponent {
  @ViewChild('zipcode') zipcode: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "zipcode";
    this.stepNb = 9;
    this.stepName = "Quel est votre code postal ?";
    this.formDataService.path.current = "9/zipcode";
    this.formDataService.path.previous = "8/country";
    this.formDataService.path.next = "10/city";
    this.placeholder = "(ex : 78350)";
  }

  ngAfterViewInit(): void {
    this.zipcode.nativeElement.focus();
  }
}
