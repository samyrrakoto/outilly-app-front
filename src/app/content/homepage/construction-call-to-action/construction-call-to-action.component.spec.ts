import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionCallToActionComponent } from './construction-call-to-action.component';

describe('ConstructionCallToActionComponent', () => {
  let component: ConstructionCallToActionComponent;
  let fixture: ComponentFixture<ConstructionCallToActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionCallToActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionCallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
