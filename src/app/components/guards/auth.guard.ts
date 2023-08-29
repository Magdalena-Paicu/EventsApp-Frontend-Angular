import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
    return true;
  }
}
