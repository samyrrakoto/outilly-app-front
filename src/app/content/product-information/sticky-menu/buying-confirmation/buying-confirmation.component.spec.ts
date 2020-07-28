import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingConfirmationComponent } from './buying-confirmation.component';

describe('BuyingConfirmationComponent', () => {
  let component: BuyingConfirmationComponent;
  let fixture: ComponentFixture<BuyingConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyingConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
