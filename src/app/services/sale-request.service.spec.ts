import { TestBed } from '@angular/core/testing';

import { SaleRequestService } from './sale-request.service';

describe('SaleRequestService', () => {
  let service: SaleRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
