import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './content/homepage/homepage.component';
import { OnboardingComponent } from './content/onboarding/onboarding.component';
import { ValidationComponent } from './content/onboarding/validation/validation.component'
import { PseudoComponent } from './content/onboarding/personal-details/pseudo/pseudo.component';
import { EmailComponent } from './content/onboarding/personal-details/email/email.component';
import { FirstNameComponent } from './content/onboarding/personal-details/first-name/first-name.component';
import { LastNameComponent } from './content/onboarding/personal-details/last-name/last-name.component';
import { GenderComponent } from './content/onboarding/personal-details/gender/gender.component';
import { StatusComponent } from './content/onboarding/personal-details/status/status.component';
import { CountryComponent } from './content/onboarding/address-details/country/country.component';
import { ZipcodeComponent } from './content/onboarding/address-details/zipcode/zipcode.component';
import { CityComponent } from './content/onboarding/address-details/city/city.component';
import { StreetComponent } from './content/onboarding/address-details/street/street.component';

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
        component: StatusComponent
      },
      {
        path:"7/country",
        component: CountryComponent
      },
      {
        path:"8/zipcode",
        component: ZipcodeComponent
      },
      {
        path:"9/city",
        component: CityComponent
      },
      {
        path:"10/street",
        component: StreetComponent
      },
      {
        path:"validation",
        component: ValidationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
