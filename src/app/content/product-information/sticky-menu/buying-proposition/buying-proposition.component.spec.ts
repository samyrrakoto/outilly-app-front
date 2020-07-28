import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingPropositionComponent } from './buying-proposition.component';

describe('BuyingPropositionComponent', () => {
  let component: BuyingPropositionComponent;
  let fixture: ComponentFixture<BuyingPropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyingPropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
