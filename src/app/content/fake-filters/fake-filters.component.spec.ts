import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeFiltersComponent } from './fake-filters.component';

describe('FakeFiltersComponent', () => {
  let component: FakeFiltersComponent;
  let fixture: ComponentFixture<FakeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
