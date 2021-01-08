import { Injectable, Injector } from '@angular/core';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private snackBar;

  constructor(protected injector: Injector) {
  }

  handleError(error) {
    this.snackBar = this.injector.get(MatSnackBar);
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.snackBar.open(errorMessage);
    return throwError(errorMessage);
  }
}
