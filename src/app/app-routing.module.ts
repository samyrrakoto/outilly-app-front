import { SellerProductsComponent } from './content/products/seller-products/seller-products.component';
import { ProductResultsComponent } from './content/homepage/products/product-results/product-results.component';
import { CompanyNameComponent } from './content/onboarding/user-details/company-details/company-name/company-name.component';
import { ProductReferenceComponent } from './content/product-creation/product-reference/product-reference.component';
import { UserSalesRunningComponent } from './content/user-dashboard/activity-log/user-sales/user-sales-running/user-sales-running.component';
import { PaymentConfirmationComponent } from './content/checkout/payment-process/payment-confirmation/payment-confirmation.component';
import { PaymentFailedComponent } from './content/checkout/payment-process/payment-failed/payment-failed.component';
import { PaymentDetailsComponent } from './content/checkout/payment-process/payment-details/payment-details.component';
import { OrderSummaryComponent } from './content/checkout/order-summary/order-summary.component';
import { MondialRelaySelectorComponent } from './content/checkout/delivery-information/mondial-relay-selector/mondial-relay-selector.component';
import { DeliveryInformationComponent } from './content/checkout/delivery-information/delivery-information.component';
import { UserPurchasesComponent } from './content/user-dashboard/activity-log/user-purchases/user-purchases.component';
import { PaymentInformationComponent } from './content/user-dashboard/information/payment-information/payment-information.component';
import { PersonalInformationComponent } from './content/user-dashboard/information/personal-information/personal-information.component';
import { ActivityLogComponent } from './content/user-dashboard/activity-log/activity-log.component';
import { InformationComponent } from './content/user-dashboard/information/information.component';
import { AnnounceOverviewComponent } from './content/product-creation/announce-overview/announce-overview.component';
import { AccountRequestComponent } from './content/product-creation/account-request/account-request.component';
import { ReservePriceComponent } from './content/product-creation/reserve-price/reserve-price.component';
import { VideoUploadComponent } from './content/product-creation/video-upload/video-upload.component';
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
import { CheckoutComponent } from './content/checkout/checkout.component';
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
import { UserSalesComponent } from './content/user-dashboard/activity-log/user-sales/user-sales.component';
import { PaymentReturnComponent } from './content/checkout/payment-process/payment-return/payment-return.component';
import { ProductUnavailableComponent } from './content/product-unavailable/product-unavailable.component';
import { Error404Component } from './content/error404/error404.component';
import { UserSalesConfirmedComponent } from './content/user-dashboard/activity-log/user-sales/user-sales-confirmed/user-sales-confirmed.component';
import { DispatchNoteComponent } from './content/user-dashboard/dispatch-note/dispatch-note.component';
import { ProductConsumableComponent } from './content/product-creation/product-consumable/product-consumable.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'product-results',
    component: ProductResultsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children : [
      {
        path: '', redirectTo: 'information', pathMatch: 'full'
      },
      {
        path: 'information',
        component: InformationComponent,
        children: [
          {
            path: '', redirectTo: 'personal-information', pathMatch: 'full'
          },
          {
            path: 'personal-information',
            component: PersonalInformationComponent
          },
          {
            path: 'payment-information',
            component: PaymentInformationComponent
          }
        ]
      },
      {
        path: 'activity-log',
        component: ActivityLogComponent,
        children: [
          {
            path: '', redirectTo: 'sales', pathMatch:'full'
          },
          {
            path: 'sales',
            component: UserSalesComponent,
            children: [
              {
                path: 'sales-running',
                component: UserSalesRunningComponent
              },
              {
                path: 'sales-confirmed',
                component: UserSalesConfirmedComponent
              }
            ]
          },
          {
            path: 'purchases',
            component: UserPurchasesComponent
          }
        ]
      },
    ]
  },
  {
    path: 'dispatch-note',
    component: DispatchNoteComponent
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    children: [
      {
        path: '', redirectTo: 'email', pathMatch: 'full'
      },
      {
        path: 'email',
        component: EmailComponent
      },
      {
        path: 'firstname',
        component: FirstNameComponent
      },
      {
        path: 'lastname',
        component: LastNameComponent
      },
      {
        path: 'gender',
        component: GenderComponent
      },
      {
        path: 'status',
        component: StatusComponent,
      },
      {
        path: 'status/company-name',
        component: CompanyNameComponent
      },
      {
        path: 'status/siret',
        component: SiretComponent
      },
      {
        path: 'status/tva',
        component: TvaComponent
      },
      {
        path: 'birthdate',
        component: BirthdateComponent
      },
      {
        path: 'country',
        component: CountryComponent
      },
      {
        path: 'zipcode',
        component: ZipcodeComponent
      },
      {
        path: 'city',
        component: CityComponent
      },
      {
        path: 'street',
        component: StreetComponent
      },
      {
        path: 'phonenumber',
        component: PhoneNumberComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'passwordconfirmation',
        component: PasswordconfirmationComponent
      },
      {
        path: 'emailoptin',
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
        path: '', redirectTo: 'announcement-title', pathMatch: 'full'
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
        path: 'product-consumable',
        component: ProductConsumableComponent
      },
      {
        path: 'product-category',
        component: ProductCategoryComponent
      },
      {
        path: 'product-brand',
        component: ProductBrandComponent
      },
      {
        path: 'product-type',
        component: ProductTypeComponent
      },
      {
        path: 'product-reference',
        component: ProductReferenceComponent
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
    path: 'product/:slug/:id',
    component: ProductInformationComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: '', redirectTo: 'delivery-information', pathMatch: 'full'
      },
      {
        path: 'delivery-information',
        component: DeliveryInformationComponent,
        children: [
          {
            path: '', redirectTo: 'mondial-relay-selector', pathMatch: 'full'
          },
          {
            path: 'mondial-relay-selector',
            component: MondialRelaySelectorComponent
          }
        ]
      },
      {
        path: 'order-summary',
        component: OrderSummaryComponent
      },
      {
        path: 'payment-return',
        component: PaymentReturnComponent
      },
      {
        path: 'payment-details',
        component: PaymentDetailsComponent
      },
      {
        path: 'payment-failed',
        component: PaymentFailedComponent
      },
      {
        path: 'payment-confirmation',
        component: PaymentConfirmationComponent
      }
    ]
  },
  {
    path: 'products/seller/:sellerId',
    component: SellerProductsComponent
  },
  {
    path: 'product-unavailable',
    component: ProductUnavailableComponent
  },
  {
    path: 'error404',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
