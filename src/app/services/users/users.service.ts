import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseApiUrl: string = environment.baseApiUrl;
  private userPayload: any;
  constructor(private http: HttpClient) {
    this.userPayload = this.decodedToken();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/api/Users');
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/Users/register', user);
  }

  authenticatedLogin(user: any): Observable<any> {
    return this.http.post<any>(
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
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  searchUser(username: string): Observable<User[]> {
    const params = new HttpParams().set('searching', username);
    return this.http.get<User[]>(this.baseApiUrl + '/api/Search', { params });
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    // console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.email;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
