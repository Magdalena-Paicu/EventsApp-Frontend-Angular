import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isAdmin: boolean = false;
  isConfirm: boolean = false;

  public isConfirmedSubject$: Subject<boolean> = new Subject<boolean>();
  public isAdminSubject$: Subject<boolean> = new Subject<boolean>();

  public isConfirmObservable(): Observable<boolean> {
    return this.isConfirmedSubject$.asObservable();
  }

  public isAdminObservable(): Observable<boolean> {
    return this.isAdminSubject$.asObservable();
  }

  public users: User[];

  login(email: string, password: string): boolean {
    const userIndex = this.users.findIndex(
      (user) => user.password === password && user.email === email
    );
    if (userIndex !== -1) {
      this.users[userIndex].is_confirmed = true;
      this.isConfirm = this.users[userIndex].is_confirmed;
      this.isAdmin = this.users[userIndex].is_admin;

      return true;
    } else {
      return false;
    }
  }
}
