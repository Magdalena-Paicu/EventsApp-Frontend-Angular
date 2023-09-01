import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from 'src/app/interfaces/reset-password';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  baseUrl: string = 'https://localhost:7294/api/Users';
  constructor(private http: HttpClient) {}

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseUrl}/send-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(
      `${this.baseUrl}/reset-password`,
      resetPasswordObj
    );
  }
}
