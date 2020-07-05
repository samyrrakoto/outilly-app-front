import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInformationComponent } from './author-information.component';

describe('AuthorInformationComponent', () => {
  let component: AuthorInformationComponent;
  let fixture: ComponentFixture<AuthorInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
