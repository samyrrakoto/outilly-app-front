import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSummaryComponent } from './information-summary.component';

describe('InformationSummaryComponent', () => {
  let component: InformationSummaryComponent;
  let fixture: ComponentFixture<InformationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
