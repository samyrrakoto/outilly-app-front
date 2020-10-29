import { TestBed } from '@angular/core/testing';

import { BidManagerService } from './bid-manager.service';

describe('BidManagerService', () => {
  let service: BidManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
