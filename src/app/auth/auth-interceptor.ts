import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private AuthServicee: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        const authToken = this.AuthServicee.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest);
    }
}
