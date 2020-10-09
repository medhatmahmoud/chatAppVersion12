import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public AuthServicee: AuthService) { }
  isLoading = false;

  onSignup(form: NgForm): any {
    // console.log(form);
    this.AuthServicee.signup(form.value.email, form.value.password);
  }

  ngOnInit(): void {
  }

}
