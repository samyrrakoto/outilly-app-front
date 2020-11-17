import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalesRunningComponent } from './user-sales-running.component';

describe('UserSalesRunningComponent', () => {
  let component: UserSalesRunningComponent;
  let fixture: ComponentFixture<UserSalesRunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSalesRunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSalesRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
