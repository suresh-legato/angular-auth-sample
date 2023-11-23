import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent implements OnInit {
  auth: AuthService;

  constructor(private _auth: AuthService) {
    this.auth = _auth;
  }

  ngOnInit(): void {
    this.auth.canAccess();
  }
}
