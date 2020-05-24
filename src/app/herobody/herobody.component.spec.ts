import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HerobodyComponent } from './herobody.component';

describe('HerobodyComponent', () => {
  let component: HerobodyComponent;
  let fixture: ComponentFixture<HerobodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerobodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerobodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
