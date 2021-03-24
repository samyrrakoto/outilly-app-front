import { TestBed } from '@angular/core/testing';

import { AlgoliaManagerService } from './algolia-manager.service';

describe('AlgoliaManagerService', () => {
  let service: AlgoliaManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoliaManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
