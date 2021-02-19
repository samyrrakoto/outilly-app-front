import { CompanyInformationComponent } from './content/onboarding/company-information/company-information.component';
import { AddressComponent } from './content/onboarding/user-details/address/address.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { GetBackComponent } from './content/get-back/get-back.component';
import { GeneralTermsAndConditionsComponent } from './content/general-terms-and-conditions/general-terms-and-conditions.component';
import { ConfidentialityPolicyComponent } from './content/confidentiality-policy/confidentiality-policy.component';
import { LegalMentionsComponent } from './content/legal-mentions/legal-mentions.component';
import { FaqComponent } from './content/faq/faq.component';
import { ContactFormComponent } from './content/contact-form/contact-form.component';
import { ResetPasswordRequestComponent } from './content/reset-password-request/reset-password-request.component';
import { ForgottenPasswordComponent } from './content/forgotten-password/forgotten-password.component';
import { BrandProductsComponent } from './content/products/brand-products/brand-products.component';
import { UserPurchasesConfirmedComponent } from './content/user-dashboard/activity-log/user-purchases/user-purchases-confirmed/user-purchases-confirmed.component';
import { UserPurchasesRunningComponent } from './content/user-dashboard/activity-log/user-purchases/user-purchases-running/user-purchases-running.component';
import { UserActivationComponent } from './content/user-activation/user-activation.component';
import { SellerProductsComponent } from './content/products/seller-products/seller-products.component';
import { ProductResultsComponent } from './content/homepage/products/product-results/product-results.component';
import { ProductReferenceComponent } from './content/product-creation/product-reference/product-reference.component';
import { UserSalesRunningComponent } from './content/user-dashboard/activity-log/user-sales/user-sales-running/user-sales-running.component';
import { PaymentConfirmationComponent } from './content/checkout/payment-process/payment-confirmation/payment-confirmation.component';
import { PaymentFailedComponent } from './content/checkout/payment-process/payment-failed/payment-failed.component';
import { PaymentDetailsComponent } from './content/checkout/payment-process/payment-details/payment-details.component';
import { OrderSummaryComponent } from './content/checkout/order-summary/order-summary.component';
import { MondialRelaySelectorComponent } from './content/checkout/delivery-information/mondial-relay-selector/mondial-relay-selector.component';
import { DeliveryInformationComponent } from './content/checkout/delivery-information/delivery-information.component';
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
import { EmailComponent } from './content/onboarding/user-details/personal-details/email/email.component';
import { GenderComponent } from './content/onboarding/user-details/personal-details/gender/gender.component';
import { StatusComponent } from './content/onboarding/user-details/personal-details/status/status.component';
import { PhoneNumberComponent } from './content/onboarding/user-details/personal-details/phone-number/phone-number.component';
import { PasswordComponent } from './content/onboarding/user-details/password/password.component';
import { BirthdateComponent } from './content/onboarding/user-details/personal-details/birthdate/birthdate.component';
import { EmailOptinComponent } from './content/onboarding/user-details/personal-details/email-optin/email-optin.component';
import { ConfirmationComponent } from './content/onboarding/confirmation/confirmation.component';
import { ProductInformationComponent } from './content/product-information/product-information.component';
import { LoginComponent } from './content/login/login.component';
import { UserDashboardComponent } from './content/user-dashboard/user-dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { PaymentReturnComponent } from './content/checkout/payment-process/payment-return/payment-return.component';
import { ProductUnavailableComponent } from './content/product-unavailable/product-unavailable.component';
import { Error404Component } from './content/error404/error404.component';
import { UserSalesConfirmedComponent } from './content/user-dashboard/activity-log/user-sales/user-sales-confirmed/user-sales-confirmed.component';
import { DispatchNoteComponent } from './content/user-dashboard/dispatch-note/dispatch-note.component';
import { ProductConsumableComponent } from './content/product-creation/product-consumable/product-consumable.component';
import { IntroductionComponent } from './content/product-creation/introduction/introduction.component';
import { AccountOnboardingComponent } from './content/onboarding/account-onboarding/account-onboarding.component';
import { AccountValidationComponent } from './content/onboarding/account-onboarding/account-validation/account-validation.component';
import { NameComponent } from './content/onboarding/user-details/name/name.component';
import { TeamComponent } from './content/team/team.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path:'team',
    component: TeamComponent
  },
  {
    path: 'contact',
    component: ContactFormComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'legal-mentions',
    component: LegalMentionsComponent
  },
  {
    path: 'confidentiality-policy',
    component: ConfidentialityPolicyComponent
  },
  {
    path: 'general-terms-and-conditions',
    component: GeneralTermsAndConditionsComponent
  },
  {
    path: 'product-results',
    component: ProductResultsComponent
  },
  {
    path: 'search',
    component: SearchEngineComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-password-request',
    component: ResetPasswordRequestComponent
  },
  {
    path: 'reset-password/:base64',
    component: ForgottenPasswordComponent
  },
  {
    path: 'get-back',
    component: GetBackComponent
  },
  {
    path: 'user/activate/:userId/:token',
    component: UserActivationComponent
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
            path: '', redirectTo: 'sales/running', pathMatch:'full'
          },
          {
            path: 'sales/running',
            component: UserSalesRunningComponent,
          },
          {
            path: 'sales/confirmed',
            component: UserSalesConfirmedComponent,
          },
          {
            path: 'purchases/running',
            component: UserPurchasesRunningComponent,
          },
          {
            path: 'purchases/confirmed',
            component: UserPurchasesConfirmedComponent,
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
        path: '', redirectTo: 'name', pathMatch: 'full'
      },
      {
        path: 'name',
        component: NameComponent
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
        path: 'company-information',
        component: CompanyInformationComponent
      },
      {
        path: 'birthdate',
        component: BirthdateComponent
      },
      {
        path: 'address',
        component: AddressComponent
      },
      {
        path: 'phonenumber',
        component: PhoneNumberComponent
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
    path: 'account-onboarding',
    component: AccountOnboardingComponent,
    children: [
      {
        path: '', redirectTo: 'email', pathMatch: 'full'
      },
      {
        path: 'email',
        component: EmailComponent
      },
      {
        path: 'password',
        component: PasswordComponent
      },
      {
        path: 'emailoptin',
        component: EmailOptinComponent
      },
      {
        path: 'account-validation',
        component: AccountValidationComponent
      }
    ]
  },
  {
    path: 'introduction',
    component: IntroductionComponent
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
    path: 'category/:categoryLabel',
    component: ProductResultsComponent
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
    path: 'products/brand/:brandId',
    component: BrandProductsComponent
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
