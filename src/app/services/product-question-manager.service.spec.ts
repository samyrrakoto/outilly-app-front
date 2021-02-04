import { TestBed } from '@angular/core/testing';

import { ProductQuestionManagerService } from './product-question-manager.service';

describe('ProductQuestionManagerService', () => {
  let service: ProductQuestionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductQuestionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
