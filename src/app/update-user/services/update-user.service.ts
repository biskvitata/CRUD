import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${userId}`)
      .pipe(
        map((res: any) => {
          return {
            id: res.data.id,
            avatar: res.data.avatar,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email
          }
        })
      )
  }

  updateUser(userId, user: User): Observable<any> {
    return this.http.put(`https://reqres.in/api/users/${userId}`, user)
  }
}
