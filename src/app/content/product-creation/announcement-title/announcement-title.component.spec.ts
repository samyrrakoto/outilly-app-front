import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementTitleComponent } from './announcement-title.component';

describe('AnnouncementTitleComponent', () => {
  let component: AnnouncementTitleComponent;
  let fixture: ComponentFixture<AnnouncementTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
