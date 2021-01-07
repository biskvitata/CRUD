import { CreateUpdateUser } from './../../models/create-update-user';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        map((res: any) => res)
      )
  }

  updateUser(userId, user: CreateUpdateUser): Observable<any> {
    return this.http.put(`https://reqres.in/api/users/${userId}`, user)
  }
}
