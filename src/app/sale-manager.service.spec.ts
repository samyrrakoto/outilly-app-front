import { TestBed } from '@angular/core/testing';

import { SaleManagerService } from './sale-manager.service';

describe('SaleManagerService', () => {
  let service: SaleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
