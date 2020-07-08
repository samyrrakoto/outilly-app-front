import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedQuestionComponent } from './predefined-question.component';

describe('PredefinedQuestionComponent', () => {
  let component: PredefinedQuestionComponent;
  let fixture: ComponentFixture<PredefinedQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredefinedQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredefinedQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
