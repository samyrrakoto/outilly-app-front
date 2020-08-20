import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandComponent } from './product-brand.component';

describe('ProductBrandComponent', () => {
  let component: ProductBrandComponent;
  let fixture: ComponentFixture<ProductBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
