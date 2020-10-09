import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, public routerr: Router) { }

  private token;
  isAuthenticated;
  tokenTimer;
  userId;
  authStatusListener = new BehaviorSubject(false);
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }
  getIsAuth(): any {
    return this.isAuthenticated;
  }

  getToken(): any {
    return this.token;
  }

  getUserId(): any {
    return this.userId;
  }

  signup(email, password): any {
    const createdUser = {email, password};
    this.http.post('http://localhost:3000/api/users/signup', createdUser)
    .subscribe((user) => {
      this.routerr.navigate(['/login']);
      console.log(user);
    }, (err) => {
      console.log(err.status);
    });
  }

  signin(email, password): any {
    const loginUser = {email, password};
    this.http.post('http://localhost:3000/api/users/login', loginUser)
    .subscribe((dataa: any) => {
      const expireInDuration = dataa.expiresIn;
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expireInDuration);
      const token = dataa.token;
      this.token = token;
      this.userId = dataa.userId;
      this.authStatusListener.next(true);
      this.isAuthenticated = true;

      // const now = new Date();
      // const expirationDate = new Date(now.getTime() + expireInDuration);
      // this.saveAuthData(this.token, expirationDate);
      // console.log(expirationDate);
      // console.log('oo');

      this.routerr.navigate(['/']);
    }, (err) => {
      console.log(err);
    });
  }

  logout(): any {
    clearTimeout(this.tokenTimer);
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.clearAuthData();
    this.routerr.navigate(['/']);

  }

  saveAuthData(token: string, expirationDate: Date): any {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }
  clearAuthData(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }
  getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
  autoAuthUser(): any {
    const authInformation = this.getAuthData();
    const now = new Date();
    // if (authInformation.expirationDate > )
    console.log('autoAuthUser method', authInformation.expirationDate);
    return authInformation;
  }

}

