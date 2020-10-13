import { TestBed } from '@angular/core/testing';

import { PurchaseManagerService } from './purchase-manager.service';

describe('PurchaseManagerService', () => {
  let service: PurchaseManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
