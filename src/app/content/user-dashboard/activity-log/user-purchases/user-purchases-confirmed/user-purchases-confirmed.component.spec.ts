import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchasesConfirmedComponent } from './user-purchases-confirmed.component';

describe('UserPurchasesConfirmedComponent', () => {
  let component: UserPurchasesConfirmedComponent;
  let fixture: ComponentFixture<UserPurchasesConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPurchasesConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPurchasesConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
