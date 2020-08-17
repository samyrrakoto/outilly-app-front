import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPriceInformationComponent } from './delivery-price-information.component';

describe('DeliveryPriceInformationComponent', () => {
  let component: DeliveryPriceInformationComponent;
  let fixture: ComponentFixture<DeliveryPriceInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPriceInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPriceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
