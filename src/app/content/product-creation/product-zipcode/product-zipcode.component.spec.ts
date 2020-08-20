import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductZipcodeComponent } from './product-zipcode.component';

describe('ProductZipcodeComponent', () => {
  let component: ProductZipcodeComponent;
  let fixture: ComponentFixture<ProductZipcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductZipcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductZipcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
