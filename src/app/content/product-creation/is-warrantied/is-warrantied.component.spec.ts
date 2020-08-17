import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsWarrantiedComponent } from './is-warrantied.component';

describe('IsWarrantiedComponent', () => {
  let component: IsWarrantiedComponent;
  let fixture: ComponentFixture<IsWarrantiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsWarrantiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsWarrantiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
