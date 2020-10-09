import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public AuthServicee: AuthService) {}
  title = 'finallPostApp2';

  ngOnInit(): void {
    // console.log(this.AuthServicee.autoAuthUser());
  }
}

