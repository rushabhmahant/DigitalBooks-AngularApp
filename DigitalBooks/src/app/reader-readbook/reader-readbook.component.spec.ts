import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderReadbookComponent } from './reader-readbook.component';

describe('ReaderReadbookComponent', () => {
  let component: ReaderReadbookComponent;
  let fixture: ComponentFixture<ReaderReadbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderReadbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderReadbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
