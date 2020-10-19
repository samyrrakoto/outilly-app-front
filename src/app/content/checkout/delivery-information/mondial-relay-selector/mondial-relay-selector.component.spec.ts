import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MondialRelaySelectorComponent } from './mondial-relay-selector.component';

describe('MondialRelaySelectorComponent', () => {
  let component: MondialRelaySelectorComponent;
  let fixture: ComponentFixture<MondialRelaySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MondialRelaySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MondialRelaySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
