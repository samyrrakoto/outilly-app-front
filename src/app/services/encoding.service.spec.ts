import { TestBed } from '@angular/core/testing';

import { EncodingService } from './encoding.service';

describe('EncodingService', () => {
  let service: EncodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
