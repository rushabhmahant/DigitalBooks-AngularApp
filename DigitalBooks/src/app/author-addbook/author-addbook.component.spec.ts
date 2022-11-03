import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAddbookComponent } from './author-addbook.component';

describe('AuthorAddbookComponent', () => {
  let component: AuthorAddbookComponent;
  let fixture: ComponentFixture<AuthorAddbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorAddbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorAddbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
