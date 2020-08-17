import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeliveryComponent } from './product-delivery.component';

describe('ProductDeliveryComponent', () => {
  let component: ProductDeliveryComponent;
  let fixture: ComponentFixture<ProductDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
