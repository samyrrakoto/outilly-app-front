import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalesConfirmedComponent } from './user-sales-confirmed.component';

describe('UserSalesConfirmedComponent', () => {
  let component: UserSalesConfirmedComponent;
  let fixture: ComponentFixture<UserSalesConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSalesConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSalesConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
