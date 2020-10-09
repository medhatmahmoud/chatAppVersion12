import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorRequestsComponent } from './error-requests/error-requests.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Unknown Error Occurred!!';
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                this.dialog.open(ErrorRequestsComponent, {data: {message: errorMessage}} );
                return throwError(error);
            })
        );
    }
}
