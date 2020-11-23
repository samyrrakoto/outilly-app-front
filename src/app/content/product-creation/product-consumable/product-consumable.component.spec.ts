import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConsumableComponent } from './product-consumable.component';

describe('ProductConsumableComponent', () => {
  let component: ProductConsumableComponent;
  let fixture: ComponentFixture<ProductConsumableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConsumableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConsumableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
