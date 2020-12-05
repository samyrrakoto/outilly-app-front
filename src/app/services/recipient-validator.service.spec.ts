import { TestBed } from '@angular/core/testing';

import { RecipientValidatorService } from './recipient-validator.service';

describe('RecipientValidatorService', () => {
  let service: RecipientValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipientValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
