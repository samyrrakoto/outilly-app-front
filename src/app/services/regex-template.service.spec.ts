import { TestBed } from '@angular/core/testing';

import { RegexTemplateService } from './regex-template.service';

describe('RegexTemplateService', () => {
  let service: RegexTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
