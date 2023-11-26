import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from './requestPayload/registerRequest';
import { RegisterResponse } from './responsePayload/RegisterResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router, private http: HttpClient) {}

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== null) {
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
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}
