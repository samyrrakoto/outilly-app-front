import { TestBed } from '@angular/core/testing';

import { ErrorMessageManagerService } from './error-message-manager.service';

describe('ErrorMessageManagerService', () => {
  let service: ErrorMessageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
