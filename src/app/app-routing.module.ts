import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './content/homepage/homepage.component';
import { OnboardingComponent } from './content/onboarding/onboarding.component';
import { ValidationComponent } from './content/onboarding/validation/validation.component'
import { PseudoComponent } from './content/onboarding/user-details/personal-details/pseudo/pseudo.component';
import { EmailComponent } from './content/onboarding/user-details/personal-details/email/email.component';
import { FirstNameComponent } from './content/onboarding/user-details/personal-details/first-name/first-name.component';
import { LastNameComponent } from './content/onboarding/user-details/personal-details/last-name/last-name.component';
import { GenderComponent } from './content/onboarding/user-details/personal-details/gender/gender.component';
import { StatusComponent } from './content/onboarding/user-details/personal-details/status/status.component';
import { CountryComponent } from './content/onboarding/user-details/address-details/country/country.component';
import { ZipcodeComponent } from './content/onboarding/user-details/address-details/zipcode/zipcode.component';
import { CityComponent } from './content/onboarding/user-details/address-details/city/city.component';
import { StreetComponent } from './content/onboarding/user-details/address-details/street/street.component';
import { PhoneNumberComponent } from './content/onboarding/user-details/personal-details/phone-number/phone-number.component';
import { PasswordComponent } from './content/onboarding/user-details/password/password.component';
import { PasswordconfirmationComponent } from './content/onboarding/user-details/passwordconfirmation/passwordconfirmation.component';
import { BirthdateComponent } from './content/onboarding/user-details/personal-details/birthdate/birthdate.component';
import { EmailOptinComponent } from './content/onboarding/user-details/personal-details/email-optin/email-optin.component';
import { ConfirmationComponent } from './content/onboarding/confirmation/confirmation.component';
import { SiretComponent } from './content/onboarding/user-details/company-details/siret/siret.component';
import { TvaComponent } from './content/onboarding/user-details/company-details/tva/tva.component';
import { ProductInformationComponent } from './content/product-information/product-information.component';
import { LoginComponent } from './content/login/login.component';
import { UserDashboardComponent } from './content/user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:"",
    component: HomepageComponent
  },
  {
    path:"home",
    component: HomepageComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"user/dashboard",
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"onboarding",
    component: OnboardingComponent,
    children: [
      {
        path:"", redirectTo: '1/username', pathMatch: 'full'
      },
      {
        path:"1/username",
        component: PseudoComponent
      },
      {
        path:"2/email",
        component: EmailComponent
      },
      {
        path:"3/firstname",
        component: FirstNameComponent
      },
      {
        path:"4/lastname",
        component: LastNameComponent
      },
      {
        path:"5/gender",
        component: GenderComponent
      },
      {
        path:"6/status",
        component: StatusComponent,
      },
      {
        path:"6/status/siret",
        component: SiretComponent
      },
      {
        path:"6/status/tva",
        component: TvaComponent
      },
      {
        path:"7/birthdate",
        component: BirthdateComponent
      },
      {
        path:"8/country",
        component: CountryComponent
      },
      {
        path:"9/zipcode",
        component: ZipcodeComponent
      },
      {
        path:"10/city",
        component: CityComponent
      },
      {
        path:"11/street",
        component: StreetComponent
      },
      {
        path:"12/phonenumber",
        component: PhoneNumberComponent
      },
      {
        path:"13/password",
        component: PasswordComponent
      },
      {
        path:"14/passwordconfirmation",
        component: PasswordconfirmationComponent
      },
      {
        path:"15/emailoptin",
        component: EmailOptinComponent
      },
      {
        path:"validation",
        component: ValidationComponent
      },
      {
        path:"confirmation",
        component: ConfirmationComponent
      }
    ]
  },
  {
    path:"product/:id",
    component: ProductInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
