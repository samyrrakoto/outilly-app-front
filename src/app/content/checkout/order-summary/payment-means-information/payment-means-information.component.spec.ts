import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMeansInformationComponent } from './payment-means-information.component';

describe('PaymentMeansInformationComponent', () => {
  let component: PaymentMeansInformationComponent;
  let fixture: ComponentFixture<PaymentMeansInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMeansInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMeansInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
