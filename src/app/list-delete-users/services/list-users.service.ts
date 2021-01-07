import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getUsers(currentPage): Observable<any> {
    // added 2 seconds delay here in order to show spinners properly
    return this.http.get(`https://reqres.in/api/users?delay=2&page=${currentPage}`)
      .pipe(
        map((res: any) => res)
      )
  }

  deleteUser(userId): Observable<any> {
    return this.http.delete(`https://reqres.in/api/users/${userId}`)
  }
}
