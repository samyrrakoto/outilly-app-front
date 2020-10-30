import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReturnComponent } from './payment-return.component';

describe('PaymentReturnComponent', () => {
  let component: PaymentReturnComponent;
  let fixture: ComponentFixture<PaymentReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
