import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from '../../../../../services/form-data.service';
import { Router } from '@angular/router';
import { OnboardingComponent } from '../../../onboarding.component';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['../../../onboarding.component.css', './email.component.css']
})
export class EmailComponent extends OnboardingComponent {
  @ViewChild('email') email: ElementRef;

  constructor(public formDataService: FormDataService, public router: Router, public formValidatorService: FormValidatorService) {
    super(formDataService, router, formValidatorService);
    this.errorMessages = formValidatorService.errorMessages;
    this.formDataService.fieldName = "email";
    this.user = formDataService.user;
    this.stepNb = 2;
    this.stepName = "Quelle est votre adresse e-mail ?";
    this.formDataService.path.previous = "1/username";
    this.formDataService.path.next = "3/firstname";
    this.placeholder = "(ex : jeanmarc78@aol.fr )";
  }

  ngAfterViewInit(): void {
    this.email.nativeElement.focus();
  }
}
