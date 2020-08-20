import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyDurationComponent } from './warranty-duration.component';

describe('WarrantyDurationComponent', () => {
  let component: WarrantyDurationComponent;
  let fixture: ComponentFixture<WarrantyDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
