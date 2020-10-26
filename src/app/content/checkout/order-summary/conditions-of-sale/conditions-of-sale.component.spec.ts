import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsOfSaleComponent } from './conditions-of-sale.component';

describe('ConditionsOfSaleComponent', () => {
  let component: ConditionsOfSaleComponent;
  let fixture: ComponentFixture<ConditionsOfSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionsOfSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
