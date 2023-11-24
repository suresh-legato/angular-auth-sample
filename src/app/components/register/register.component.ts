import { Component, OnInit } from '@angular/core';

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
  };
  submit = false;
  errorMessage = '';
  loading = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    console.log(this.formData);
  }
}
