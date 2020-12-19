import { TestBed } from '@angular/core/testing';

import { MondialRelayManagerService } from './mondial-relay-manager.service';

describe('MondialRelayManagerService', () => {
  let service: MondialRelayManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MondialRelayManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
