import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInformationIncentivesComponent } from './product-information-incentives.component';

describe('ProductInformationIncentivesComponent', () => {
  let component: ProductInformationIncentivesComponent;
  let fixture: ComponentFixture<ProductInformationIncentivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInformationIncentivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInformationIncentivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
