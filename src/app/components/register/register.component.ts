import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass',
})
export class RegisterComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    password: '',
    platformId: '',
  };
  submit = false;
  errorMessage = '';
  loading = false;

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this._auth.redirectToDashboard();
  }

  onSubmit() {
    this.loading = true;
    console.log(this.formData);
    this._auth
      .register({
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password,
        platformId: parseInt(this.formData.platformId),
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this._auth.storeToken(response.id.toString());
        },
        error: (data) => {
          if (data.error.error.message == 'INVALID_EMAIL') {
            this.errorMessage = 'Invalid Email!';
          } else if (data.error.error.message == 'EMAIL_EXIST') {
            this.errorMessage = 'Already Email Exist!';
          } else {
            this.errorMessage = 'Unknown Error!';
          }
        },
      })
      .add(() => {
        this.loading = false;
        console.log('Register Completed');
        this._auth.redirectToDashboard();
      });
  }
}
