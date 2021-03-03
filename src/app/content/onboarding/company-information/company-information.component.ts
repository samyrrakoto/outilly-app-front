import { Viewport, ViewportService } from 'src/app/services/viewport.service';
import { Validators } from '@angular/forms';
import { profileOnboarding } from 'src/app/onboardings';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StepForm } from 'src/app/models/step-form';
import { FormDataService } from 'src/app/services/form-data.service';
import { User } from 'src/app/models/user';
import { FormCreatorService } from 'src/app/services/form-creator.service';
import { RegexTemplateService } from 'src/app/services/regex-template.service';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['../onboarding.component.css', './company-information.component.css']
})
export class CompanyInformationComponent extends StepForm implements OnInit {
  @ViewChild('companyName') companyName: ElementRef;
  user: User = new User();

  constructor(
    public formData: FormDataService,
    public formCreator: FormCreatorService,
    private regex: RegexTemplateService,
    private viewport: ViewportService
  ) {
    super(profileOnboarding, 'company-information');
    !this.formData.user ? this.formData.user = JSON.parse(localStorage.getItem('formData')).user : null;
    this.user = formData.user;
    this.stepName = "Dites-nous en plus sur votre société";
  }

  ngOnInit(): void {
    this.formCreator.getForm(this.getValidations());
  }

  ngAfterViewInit(): void {
    if (!this.viewport.check(Viewport.MOBILE) && this.companyName) {
      this.companyName.nativeElement.focus();
    }
  }

  private getValidations(): any {
    return {
      companyName: [this.user.userProfile.company.name, [Validators.required]],
      tva: [this.user.userProfile.company.tvanumber, [Validators.required, this.regex.validVatRegex()]],
      siret: [this.user.userProfile.company.siret, [Validators.required, Validators.pattern(this.regex.SIRET)]]
    };
  }
}
