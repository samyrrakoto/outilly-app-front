import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnavailableComponent } from './product-unavailable.component';

describe('ProductUnavailableComponent', () => {
  let component: ProductUnavailableComponent;
  let fixture: ComponentFixture<ProductUnavailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUnavailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
