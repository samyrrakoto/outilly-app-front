import { TestBed } from '@angular/core/testing';

import { ContactRequestService } from './contact-request.service';

describe('ContactRequestService', () => {
  let service: ContactRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
