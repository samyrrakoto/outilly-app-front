import { Onboarding } from './models/onboarding';

export const accountOnboarding: Onboarding = {
  root: '/account-onboarding/',
  onboardingName: 'Création de votre compte',
  steps: [
    'email',
    'password',
    'emailoptin'
  ]
};

export const profileOnboarding: Onboarding = {
  root: '/onboarding/',
  onboardingName: 'Complétion de votre profil',
  steps: [
    'name',
    'gender',
    'status',
    'company-information',
    'birthdate',
    'address',
    'phonenumber',
    'validation',
    'confirmation'
  ]
};

export const productOnboarding: Onboarding = {
  root: '/product/create/',
  onboardingName: '',
  steps: [
    'announcement-title',
    'media-upload',
    'product-category',
    'product-brand',
    'product-state',
    'product-description',
    'product-zipcode',
    'product-weight',
    'is-warrantied',
    'warranty-duration',
    'video-upload',
    'reserve-price',
    'announce-overview'
  ]
};
