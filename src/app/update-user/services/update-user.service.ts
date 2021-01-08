import { ErrorHandlerService } from './../../shared-services/error-handler.service';
import { Injectable, Injector } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService extends ErrorHandlerService {

  constructor(
    private http: HttpClient,
    injector: Injector
  ) {
    super(injector);
  }

  getUser(userId: number): Observable<any> {
      return this.http.get(`https://reqres.in/api/users/${userId}`).pipe(
          map((res: any) => {
            return {
              id: res.data.id,
              avatar: res.data.avatar,
              firstName: res.data.first_name,
              lastName: res.data.last_name,
              email: res.data.email
            }
          }),
          catchError(err => this.handleError(err))
        );
    }

  updateUser(userId, user: User): Observable<any> {
    return this.http.put(`https://reqres.in/api/users/${userId}`, user).pipe(
      map(res => res),
      catchError(err => this.handleError(err))
    );
  }
}
