import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';

@Component({
  selector: 'app-forget-password-dialog',
  templateUrl: './forget-password-dialog.component.html',
  styleUrls: ['./forget-password-dialog.component.scss'],
})
export class ForgetPasswordDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ForgetPasswordDialogComponent>,
    private resetPassword: ResetPasswordService
  ) {}

  public resetPasswordEmail: string;

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  checkValiEmail(event: string) {} // aici ar trebui sa validez emailul pe frontend

  sendEmail() {
    this.resetPassword
      .sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe();
    this.resetPasswordEmail = '';
  }
}
