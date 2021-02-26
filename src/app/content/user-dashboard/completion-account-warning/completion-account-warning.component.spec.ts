import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionAccountWarningComponent } from './completion-account-warning.component';

describe('CompletionAccountWarningComponent', () => {
  let component: CompletionAccountWarningComponent;
  let fixture: ComponentFixture<CompletionAccountWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionAccountWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionAccountWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
