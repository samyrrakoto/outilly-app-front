import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideInformationComponent } from './side-information.component';

describe('SideInformationComponent', () => {
  let component: SideInformationComponent;
  let fixture: ComponentFixture<SideInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
