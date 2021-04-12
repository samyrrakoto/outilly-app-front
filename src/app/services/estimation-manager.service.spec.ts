import { TestBed } from '@angular/core/testing';

import { EstimationManagerService } from './estimation-manager.service';

describe('EstimationManagerService', () => {
  let service: EstimationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
