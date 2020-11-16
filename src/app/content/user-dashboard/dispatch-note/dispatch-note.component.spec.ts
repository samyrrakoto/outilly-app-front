import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchNoteComponent } from './dispatch-note.component';

describe('DispatchNoteComponent', () => {
  let component: DispatchNoteComponent;
  let fixture: ComponentFixture<DispatchNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
