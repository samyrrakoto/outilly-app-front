import { TestBed } from '@angular/core/testing';

import { FormConstraintService } from './form-constraint.service';

describe('FormConstraintService', () => {
  let service: FormConstraintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormConstraintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
