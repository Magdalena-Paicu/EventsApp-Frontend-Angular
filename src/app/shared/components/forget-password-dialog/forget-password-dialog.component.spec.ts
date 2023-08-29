import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordDialogComponent } from './forget-password-dialog.component';

describe('ForgetPasswordDialogComponent', () => {
  let component: ForgetPasswordDialogComponent;
  let fixture: ComponentFixture<ForgetPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
