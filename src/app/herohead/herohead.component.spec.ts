import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroheadComponent } from './herohead.component';

describe('HeroheadComponent', () => {
  let component: HeroheadComponent;
  let fixture: ComponentFixture<HeroheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
