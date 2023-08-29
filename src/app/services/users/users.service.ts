import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/api/Users');
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/Users/register', user);
  }

  authenticatedLogin(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseApiUrl + '/api/Users/authenticate',
      user
    );
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  searchUser(username: string): Observable<User[]> {
    const params = new HttpParams().set('searching', username);
    return this.http.get<User[]>(this.baseApiUrl + '/api/Search', { params });
  }
}
