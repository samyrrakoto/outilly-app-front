import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLabelComponent } from './step-label.component';

describe('StepLabelComponent', () => {
  let component: StepLabelComponent;
  let fixture: ComponentFixture<StepLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
