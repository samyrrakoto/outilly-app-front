import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDomainComponent } from './activity-domain.component';

describe('ActivityDomainComponent', () => {
  let component: ActivityDomainComponent;
  let fixture: ComponentFixture<ActivityDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
