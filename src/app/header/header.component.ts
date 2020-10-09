import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public AuthServicee: AuthService) { }

  isAuthenticated;
  authListenerSubscription: Subscription;

  logOut(): any {
    this.isAuthenticated = false;
    this.AuthServicee.logout();
  }
  ngOnInit(): void {
    this.authListenerSubscription = this.AuthServicee.getAuthStatusListener().subscribe((dataa) => {
      this.isAuthenticated = dataa;
    });
  }
  ngOnDestroy(): any {
    this.authListenerSubscription.unsubscribe();
  }

}
