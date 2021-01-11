import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialityPolicyComponent } from './confidentiality-policy.component';

describe('ConfidentialityPolicyComponent', () => {
  let component: ConfidentialityPolicyComponent;
  let fixture: ComponentFixture<ConfidentialityPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfidentialityPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfidentialityPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
