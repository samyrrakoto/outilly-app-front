import { TestBed } from '@angular/core/testing';

import { BrandManagerService } from './brand-manager.service';

describe('BrandManagerService', () => {
  let service: BrandManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
