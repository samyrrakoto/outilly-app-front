import { TestBed } from '@angular/core/testing';

import { OnboardingManagerService } from './onboarding-manager.service';

describe('OnboardingManagerService', () => {
  let service: OnboardingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
