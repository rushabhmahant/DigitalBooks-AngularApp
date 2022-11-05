import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorUpdatebookComponent } from './author-updatebook.component';

describe('AuthorUpdatebookComponent', () => {
  let component: AuthorUpdatebookComponent;
  let fixture: ComponentFixture<AuthorUpdatebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorUpdatebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorUpdatebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
