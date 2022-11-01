import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderSubscriptionsComponent } from './reader-subscriptions.component';

describe('ReaderSubscriptionsComponent', () => {
  let component: ReaderSubscriptionsComponent;
  let fixture: ComponentFixture<ReaderSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
