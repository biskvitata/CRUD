import { CreateUser } from './../../models/create-update-user';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared-services/error-handler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService extends ErrorHandlerService {

  constructor(
    private http: HttpClient,
    injector: Injector
  ) {
    super(injector)
  }

  createUser(user: CreateUser): Observable<any> {
    return this.http.post(`https://reqres.in/api/users`, user).pipe(
      map(res => res),
      catchError(err => this.handleError(err))
    );
  }
}
