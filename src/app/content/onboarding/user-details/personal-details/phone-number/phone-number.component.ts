import { FormCreatorService } from 'src/app/services/form-creator.service';
import { profileOnboarding } from 'src/app/onboardings';
import { Component } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { StepForm } from 'src/app/models/step-form';
import { User } from 'src/app/models/user';
import { Validators } from '@angular/forms';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['../../../onboarding.component.css', './phone-number.component.css']
})
export class PhoneNumberComponent extends StepForm {
  user: User;

  constructor(
    public formData: FormDataService,
    public formCreator: FormCreatorService,
    public regexTemplate: RegexTemplateService)
  {
    super(profileOnboarding, 'phonenumber');
    !this.formData.user.username ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.stepName = "Votre numéro de téléphone ?";
    this.stepSubtitle = "Utile pour contacter vos futurs acheteurs et/ou vendeurs, n'est-ce pas ? ";
    this.placeholder = "0601020304";
  }

  ngOnInit(): void {
    this.formCreator.getForm(this.getValidations());
  }

  ngAfterViewInit(): void {
    const phone: HTMLElement = document.getElementById('phone');

    if (phone !== null) {
      phone.focus();
    }
  }

  public getValidations(): any {
    return {
      phone: [this.user.userProfile.phone1, [Validators.required, Validators.pattern(this.regexTemplate.PHONE)]]
    }
  }
}
