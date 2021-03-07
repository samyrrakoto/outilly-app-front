import { TestBed } from '@angular/core/testing';

import { KycRequestService } from './kyc-request.service';

describe('KycRequestService', () => {
  let service: KycRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
