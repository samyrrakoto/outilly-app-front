import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sellingcall2actionComponent } from './sellingcall2action.component';

describe('Sellingcall2actionComponent', () => {
  let component: Sellingcall2actionComponent;
  let fixture: ComponentFixture<Sellingcall2actionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sellingcall2actionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sellingcall2actionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
