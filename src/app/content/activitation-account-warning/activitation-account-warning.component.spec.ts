import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitationAccountWarningComponent } from './activitation-account-warning.component';

describe('ActivitationAccountWarningComponent', () => {
  let component: ActivitationAccountWarningComponent;
  let fixture: ComponentFixture<ActivitationAccountWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitationAccountWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitationAccountWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
