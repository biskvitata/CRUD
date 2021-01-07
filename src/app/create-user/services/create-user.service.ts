import { CreateUser } from './../../models/create-update-user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(
    private http: HttpClient,
  ) {
  }

  createUser(user: CreateUser): Observable<any> {
    return this.http.post(`https://reqres.in/api/users`, user);
  }
}
