import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterResponse } from './responsePayload/RegisterResponse';
import { LoginRequest } from './requestPayload/LoginRequest';
import { LoginResponse } from './responsePayload/LoginResponse';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../model/User';
import { Platform } from '../model/Platform';
import { UserPlatform } from '../model/UserPlatform';
import { RegisterRequest } from './requestPayload/registerRequest';

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
    } else {
      this._router.navigate(['/dashboard']);
    }
  }

  redirectToDashboard() {
    if (this.isAuthenticated()) {
      this._router.navigate(['/dashboard']);
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

  getUser(payload: LoginRequest): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:3000/users?email=${payload.email}&password=${payload.password}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getPlatform(platformId: number): Observable<Platform[]> {
    console.log('getPlatforms', platformId);
    return this.http.get<Platform[]>(
      `http://localhost:3000/platforms?id=${platformId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  doLogin(payload: LoginRequest): Observable<UserPlatform> {
    let user: User;
    return this.getUser(payload).pipe(
      switchMap((userResponse) => {
        console.log('userResponse', userResponse);
        return this.getPlatform(userResponse[0].platformId).pipe(
          map((platformResponse) => {
            console.log('platformResponse', platformResponse);
            return {
              users: userResponse,
              platforms: platformResponse,
            };
          })
        );
      })
    );
  }
}
