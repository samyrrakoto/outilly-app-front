import { AnnounceOverviewComponent } from './content/product-creation/announce-overview/announce-overview.component';
import { AccountRequestComponent } from './content/product-creation/account-request/account-request.component';
import { ReservePriceComponent } from './content/product-creation/reserve-price/reserve-price.component';
import { AnnounceKindComponent } from './content/product-creation/announce-kind/announce-kind.component';
import { VideoUploadComponent } from './content/product-creation/video-upload/video-upload.component';
import { DeliveryPriceInformationComponent } from './content/product-creation/delivery-price-information/delivery-price-information.component';
import { WarrantyDurationComponent } from './content/product-creation/warranty-duration/warranty-duration.component';
import { IsWarrantiedComponent } from './content/product-creation/is-warrantied/is-warrantied.component';
import { ProductWeightComponent } from './content/product-creation/product-weight/product-weight.component';
import { ProductDeliveryComponent } from './content/product-creation/product-delivery/product-delivery.component';
import { ProductZipcodeComponent } from './content/product-creation/product-zipcode/product-zipcode.component';
import { ProductDescriptionComponent } from './content/product-creation/product-description/product-description.component';
import { ProductStateComponent } from './content/product-creation/product-state/product-state.component';
import { ProductTypeComponent } from './content/product-creation/product-type/product-type.component';
import { ProductCategoryComponent } from './content/product-creation/product-category/product-category.component';
import { ProductBrandComponent } from './content/product-creation/product-brand/product-brand.component';
import { MediaUploadComponent } from './content/product-creation/media-upload/media-upload.component';
import { AnnouncementTitleComponent } from './content/product-creation/announcement-title/announcement-title.component';
import { ProductCreationComponent } from './content/product-creation/product-creation.component';
import { CheckoutComponent } from './content/product-information/checkout/checkout.component';
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
import { BatchChoiceComponent } from './content/product-creation/batch-choice/batch-choice.component';
import { ActivityDomainComponent } from './content/product-creation/activity-domain/activity-domain.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    children: [
      {
        path: '', redirectTo: '1/username', pathMatch: 'full'
      },
      {
        path: '1/username',
        component: PseudoComponent
      },
      {
        path: '2/email',
        component: EmailComponent
      },
      {
        path: '3/firstname',
        component: FirstNameComponent
      },
      {
        path: '4/lastname',
        component: LastNameComponent
      },
      {
        path: '5/gender',
        component: GenderComponent
      },
      {
        path: '6/status',
        component: StatusComponent,
      },
      {
        path: '6/status/siret',
        component: SiretComponent
      },
      {
        path: '6/status/tva',
        component: TvaComponent
      },
      {
        path: '7/birthdate',
        component: BirthdateComponent
      },
      {
        path: '8/country',
        component: CountryComponent
      },
      {
        path: '9/zipcode',
        component: ZipcodeComponent
      },
      {
        path: '10/city',
        component: CityComponent
      },
      {
        path: '11/street',
        component: StreetComponent
      },
      {
        path: '12/phonenumber',
        component: PhoneNumberComponent
      },
      {
        path: '13/password',
        component: PasswordComponent
      },
      {
        path: '14/passwordconfirmation',
        component: PasswordconfirmationComponent
      },
      {
        path: '15/emailoptin',
        component: EmailOptinComponent
      },
      {
        path: 'validation',
        component: ValidationComponent
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent
      }
    ]
  },
  {
    path: 'product/create',
    component: ProductCreationComponent,
    children: [
      {
        path: '', redirectTo: 'batch-choice', pathMatch: 'full'
      },
      {
        path: 'batch-choice',
        component: BatchChoiceComponent
      },
      {
        path: 'announcement-title',
        component: AnnouncementTitleComponent
      },
      {
        path: 'media-upload',
        component: MediaUploadComponent
      },
      {
        path: 'activity-domain',
        component: ActivityDomainComponent
      },
      {
        path: 'product-brand',
        component: ProductBrandComponent
      },
      {
        path: 'product-category',
        component: ProductCategoryComponent
      },
      {
        path: 'product-type',
        component: ProductTypeComponent
      },
      {
        path: 'product-state',
        component: ProductStateComponent
      },
      {
        path: 'product-description',
        component: ProductDescriptionComponent
      },
      {
        path: 'product-zipcode',
        component: ProductZipcodeComponent
      },
      {
        path: 'product-delivery',
        component: ProductDeliveryComponent
      },
      {
        path: 'product-weight',
        component: ProductWeightComponent
      },
      {
        path: 'delivery-price-information',
        component: DeliveryPriceInformationComponent
      },
      {
        path: 'is-warrantied',
        component: IsWarrantiedComponent
      },
      {
        path: 'warranty-duration',
        component: WarrantyDurationComponent
      },
      {
        path: 'video-upload',
        component: VideoUploadComponent
      },
      {
        path: 'announce-kind',
        component: AnnounceKindComponent
      },
      {
        path: 'reserve-price',
        component: ReservePriceComponent
      },
      {
        path: 'account-request',
        component: AccountRequestComponent
      },
      {
        path: 'announce-overview',
        component: AnnounceOverviewComponent
      }
    ]
  },
  {
    path: 'product/:id',
    component: ProductInformationComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
