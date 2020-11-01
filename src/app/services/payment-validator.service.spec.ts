import { TestBed } from '@angular/core/testing';

import { PaymentValidatorService } from './payment-validator.service';

describe('PaymentValidatorService', () => {
  let service: PaymentValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
