import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate['/login'];
      console.log('Please Login First !');
      return false;
    }
  }
}
