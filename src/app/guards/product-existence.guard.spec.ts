import { TestBed } from '@angular/core/testing';

import { ProductExistenceGuard } from './product-existence.guard';

describe('ProductExistenceGuard', () => {
  let guard: ProductExistenceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductExistenceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
