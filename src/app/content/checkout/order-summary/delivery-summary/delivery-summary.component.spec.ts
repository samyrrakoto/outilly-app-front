import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySummaryComponent } from './delivery-summary.component';

describe('DeliverySummaryComponent', () => {
  let component: DeliverySummaryComponent;
  let fixture: ComponentFixture<DeliverySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
