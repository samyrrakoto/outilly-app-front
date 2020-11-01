import { TestBed } from '@angular/core/testing';

import { DashboardValidatorService } from './dashboard-validator.service';

describe('DashboardValidatorService', () => {
  let service: DashboardValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
