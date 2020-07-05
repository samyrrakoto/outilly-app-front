import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentinformationComponent } from './paymentinformation.component';

describe('PaymentinformationComponent', () => {
  let component: PaymentinformationComponent;
  let fixture: ComponentFixture<PaymentinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
