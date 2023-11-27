import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from './requestPayload/RegisterRequest';
import { RegisterResponse } from './responsePayload/RegisterResponse';
import { LoginRequest } from './requestPayload/LoginRequest';
import { LoginResponse } from './responsePayload/LoginResponse';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../model/User';
import { Platform } from '../model/Platform';
import { UserPlatform } from '../model/UserPlatform';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router, private http: HttpClient) {}

  getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  canAccess() {
    if (!this.isAuthenticated()) {
      // redirect to login page
      this._router.navigate(['/login']);
    }
  }

  register(payload: RegisterRequest) {
    return this.http.post<RegisterResponse>(
      'http://localhost:3000/users',
      payload,
      {
        headers: this.getHeaders(),
      }
    );
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getUser(payload: LoginRequest): Observable<User> {
    return this.http.get<User>(
      `http://localhost:3000/users?email=${payload.email}&password=${payload.password}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getPlatform(platformId: number): Observable<Platform> {
    return this.http.get<Platform>(
      `http://localhost:3000/platforms?id=${platformId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  doLogin(payload: LoginRequest): Observable<UserPlatform> {
    return this.getUser(payload).pipe(
      switchMap((userResponse: User) => {
        return this.getPlatform(userResponse.platformId).pipe(
          map((platformResponse) => {
            return {
              user: userResponse,
              platform: platformResponse,
            };
          })
        );
      })
    );
  }
}
