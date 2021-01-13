import { TestBed } from '@angular/core/testing';

import { SearchManagerService } from './search-manager.service';

describe('SearchManagerService', () => {
  let service: SearchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
