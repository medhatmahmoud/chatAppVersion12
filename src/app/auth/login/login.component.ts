import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public AuthServicee: AuthService) { }
  isLoading = false;

  onLogin(form: NgForm): any {
    console.log(form.value);
    this.AuthServicee.signin(form.value.email, form.value.password);
  }

  ngOnInit(): void {
  }

}
