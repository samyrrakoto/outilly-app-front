import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceOverviewComponent } from './announce-overview.component';

describe('AnnounceOverviewComponent', () => {
  let component: AnnounceOverviewComponent;
  let fixture: ComponentFixture<AnnounceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
