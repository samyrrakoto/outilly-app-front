import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOptinComponent } from './email-optin.component';

describe('EmailOptinComponent', () => {
  let component: EmailOptinComponent;
  let fixture: ComponentFixture<EmailOptinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailOptinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailOptinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
