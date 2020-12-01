import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormDataService } from '../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-passwordconfirmation',
  templateUrl: './passwordconfirmation.component.html',
  styleUrls: ['../../onboarding.component.css', './passwordconfirmation.component.css']
})
export class PasswordconfirmationComponent extends OnboardingComponent {
  @ViewChild('pwdConfirmation') pwdConfirmation: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    !this.formDataService.user.username ? this.formDataService.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formDataService.user;
    this.errorMessages = formValidatorService.constraintManager.errorMessageManager.errorMessages;
    this.formDataService.fieldName = "pwdConfirmation";
    this.stepNb = 14;
    this.stepName = "Confirmez votre mot de passe";
    this.formDataService.path.current = "14/passwordconfirmation";
    this.formDataService.path.previous = "13/password";
    this.formDataService.path.next = "15/emailoptin";
  }

  ngAfterViewInit(): void {
    this.pwdConfirmation.nativeElement.focus();
  }
}
