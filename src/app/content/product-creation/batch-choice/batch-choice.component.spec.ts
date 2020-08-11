import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchChoiceComponent } from './batch-choice.component';

describe('BatchChoiceComponent', () => {
  let component: BatchChoiceComponent;
  let fixture: ComponentFixture<BatchChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
