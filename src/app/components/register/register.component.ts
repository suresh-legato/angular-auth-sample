import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass',
})
export class RegisterComponent implements OnInit {
  formdata = {
    name: '',
    email: '',
  };
  submit = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {}
}
