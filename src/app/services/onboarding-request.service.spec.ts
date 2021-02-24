import { TestBed } from '@angular/core/testing';

import { OnboardingRequestService } from './onboarding-request.service';

describe('OnboardingRequestService', () => {
  let service: OnboardingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
