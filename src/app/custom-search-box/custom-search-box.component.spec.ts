import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchBoxComponent } from './custom-search-box.component';

describe('CustomSearchBoxComponent', () => {
  let component: CustomSearchBoxComponent;
  let fixture: ComponentFixture<CustomSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
