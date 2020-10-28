import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandDeliveryComponent } from './hand-delivery.component';

describe('HandDeliveryComponent', () => {
  let component: HandDeliveryComponent;
  let fixture: ComponentFixture<HandDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
