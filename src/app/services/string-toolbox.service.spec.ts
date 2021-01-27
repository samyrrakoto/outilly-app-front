import { TestBed } from '@angular/core/testing';

import { StringToolboxService } from './string-toolbox.service';

describe('StringToolboxService', () => {
  let service: StringToolboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringToolboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
