import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  // selector: 'app-error-requests',
  templateUrl: './error-requests.component.html',
  // styleUrls: ['./error-requests.component.css']
})
export class ErrorRequestsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }
}
