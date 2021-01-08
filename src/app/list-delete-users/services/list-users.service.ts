import { Injectable, Injector } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared-services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService extends ErrorHandlerService {

  constructor(
    private http: HttpClient,
    injector: Injector
  ) {
    super(injector);
  }

  getUsers(currentPage): Observable<any> {
    // added 2 seconds delay here in order to show spinners properly
    return this.http.get(`https://reqres.in/api/users?delay=2&page=${currentPage}`).pipe(
        map((res: any) => res),
        catchError(err => this.handleError(err))
      );
  }

  deleteUser(userId): Observable<any> {
    return this.http.delete(`https://reqres.in/api/users/${userId}`).pipe(
      map((res: any) => res),
      catchError(err => this.handleError(err))
    );
  }
}
