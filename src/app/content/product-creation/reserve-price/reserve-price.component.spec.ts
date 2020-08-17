import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePriceComponent } from './reserve-price.component';

describe('ReservePriceComponent', () => {
  let component: ReservePriceComponent;
  let fixture: ComponentFixture<ReservePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
