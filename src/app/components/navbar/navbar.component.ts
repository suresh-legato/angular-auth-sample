import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  constructor(public auth: AuthService, private _router: Router) {}

  onLogout() {
    this.auth.storeToken('');
    this._router.navigate(['/login']);
  }
}
