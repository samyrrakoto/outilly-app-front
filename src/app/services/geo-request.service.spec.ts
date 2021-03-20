import { TestBed } from '@angular/core/testing';

import { GeoRequestService } from './geo-request.service';

describe('GeoRequestService', () => {
  let service: GeoRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
