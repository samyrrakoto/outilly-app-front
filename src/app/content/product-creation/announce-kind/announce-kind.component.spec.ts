import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceKindComponent } from './announce-kind.component';

describe('AnnounceKindComponent', () => {
  let component: AnnounceKindComponent;
  let fixture: ComponentFixture<AnnounceKindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnounceKindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
