import { TestBed } from '@angular/core/testing';

import { KycManagerService } from './kyc-manager.service';

describe('KycManagerService', () => {
  let service: KycManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
