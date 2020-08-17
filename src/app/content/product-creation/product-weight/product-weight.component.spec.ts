import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWeightComponent } from './product-weight.component';

describe('ProductWeightComponent', () => {
  let component: ProductWeightComponent;
  let fixture: ComponentFixture<ProductWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
