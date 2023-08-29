import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/app/components/guards/auth.guard';
import { UsersService } from 'src/app/services/users/users.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.userService.getToken();

    return next.handle(request);
  }
}
