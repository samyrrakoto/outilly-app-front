import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Buyingcall2actionComponent } from './buyingcall2action.component';

describe('Buyingcall2actionComponent', () => {
  let component: Buyingcall2actionComponent;
  let fixture: ComponentFixture<Buyingcall2actionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Buyingcall2actionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Buyingcall2actionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
