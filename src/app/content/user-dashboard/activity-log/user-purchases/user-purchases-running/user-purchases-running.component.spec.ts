import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchasesRunningComponent } from './user-purchases-running.component';

describe('UserPurchasesRunningComponent', () => {
  let component: UserPurchasesRunningComponent;
  let fixture: ComponentFixture<UserPurchasesRunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPurchasesRunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPurchasesRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
