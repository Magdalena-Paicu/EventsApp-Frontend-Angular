import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private email$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');

  constructor() {}

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleFromStore(role: string) {
    this.role$.next(role);
  }

  public getMailFromStore() {
    return this.email$.asObservable();
  }

  public setMailFromStore(email: string) {
    this.email$.next(email);
  }
}
