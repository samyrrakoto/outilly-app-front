import { TestBed } from '@angular/core/testing';

import { EstimationRequestService } from './estimation-request.service';

describe('EstimationRequestService', () => {
  let service: EstimationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
