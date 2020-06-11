import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiretComponent } from './siret.component';

describe('SiretComponent', () => {
  let component: SiretComponent;
  let fixture: ComponentFixture<SiretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
