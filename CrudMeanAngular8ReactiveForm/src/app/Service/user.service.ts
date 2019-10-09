import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { BaseURL, Api } from '../path.config/Api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(user: User):any {
    console.log("service ",user);
    return this.http.post(BaseURL + `/auth/signup`, user);
  }
}
