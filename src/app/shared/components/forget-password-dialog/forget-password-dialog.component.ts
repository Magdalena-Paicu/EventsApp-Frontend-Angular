import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-password-dialog',
  templateUrl: './forget-password-dialog.component.html',
  styleUrls: ['./forget-password-dialog.component.scss'],
})
export class ForgetPasswordDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ForgetPasswordDialogComponent>) {}

  public resetPasswordEmail!: string;

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  checkValiEmail(event: string) {}
}
