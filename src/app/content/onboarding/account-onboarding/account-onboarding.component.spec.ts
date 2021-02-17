import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOnboardingComponent } from './account-onboarding.component';

describe('AccountOnboardingComponent', () => {
  let component: AccountOnboardingComponent;
  let fixture: ComponentFixture<AccountOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
