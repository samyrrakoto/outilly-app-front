import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiontovendorComponent } from './questiontovendor.component';

describe('QuestiontovendorComponent', () => {
  let component: QuestiontovendorComponent;
  let fixture: ComponentFixture<QuestiontovendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestiontovendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestiontovendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
