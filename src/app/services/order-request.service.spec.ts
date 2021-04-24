import { TestBed } from '@angular/core/testing';

import { OrderRequestService } from './order-request.service';

describe('OrderRequestService', () => {
  let service: OrderRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
