import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
  formData = {
    email: '',
    password: '',
  };
  submit = false;
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    console.log(this.formData);
    this.auth
      .doLogin({
        email: this.formData.email,
        password: this.formData.password,
        platformId: 1,
      })
      .subscribe({
        next: (data) => {
          console.log('login success', data);
          this.auth.storeToken(data.user.id.toString());
        },
        error: (data) => {
          console.log('login failed');
        },
      });
  }
}
