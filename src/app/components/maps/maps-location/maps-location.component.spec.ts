import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsLocationComponent } from './maps-location.component';

describe('MapsLocationComponent', () => {
  let component: MapsLocationComponent;
  let fixture: ComponentFixture<MapsLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
