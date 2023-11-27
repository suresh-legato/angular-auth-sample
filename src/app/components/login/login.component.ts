import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserPlatform } from '../../model/UserPlatform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
  formData = {
    email: '',
    password: '',
    platformId: '',
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
        platformId: parseInt(this.formData.platformId),
      })
      .subscribe({
        next: (data: UserPlatform) => {
          console.log('login success', data);
          this.auth.storeToken(data.users[0].id.toString());
        },
        error: (data) => {
          if (data.error.error.message != null) {
            console.log('login failed', data);
            this.errorMessage = data.error.error.message;
          }
        },
      })
      .add(() => {
        this.loading = false;
        console.log('login completed');
      });
  }
}
