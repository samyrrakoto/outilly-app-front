import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEstimateComponent } from './product-estimate.component';

describe('ProductEstimateComponent', () => {
  let component: ProductEstimateComponent;
  let fixture: ComponentFixture<ProductEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEstimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
