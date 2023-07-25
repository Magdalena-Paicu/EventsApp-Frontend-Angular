import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPageDetailsComponent } from './event-page-details.component';

describe('EventPageDetailsComponent', () => {
  let component: EventPageDetailsComponent;
  let fixture: ComponentFixture<EventPageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPageDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
