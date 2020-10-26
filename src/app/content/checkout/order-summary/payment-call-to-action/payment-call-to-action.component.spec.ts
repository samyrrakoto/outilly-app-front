import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCallToActionComponent } from './payment-call-to-action.component';

describe('PaymentCallToActionComponent', () => {
  let component: PaymentCallToActionComponent;
  let fixture: ComponentFixture<PaymentCallToActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCallToActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
