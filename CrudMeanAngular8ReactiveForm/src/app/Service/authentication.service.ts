import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseURL, Api } from '../path.config/Api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, 
    private toastr: ToastrService,
     private router: Router, ) { }

  login(username: string, password: string) {
    return this.http.post<any>(BaseURL + `/auth/login`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                // this.currentUserSubject.next(user);
            }

            return user;
        }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/login');
      // this.currentUserSubject.next(null);
  }

  getToken(){
    const getUser = JSON.parse(localStorage.getItem('currentUser'));
    if(getUser)
      return getUser.token;
  }

  loggedIn():boolean{
    return !! this.getToken();  // !! uses for returning boolean value if get token return true else false
  }

  tokenExpire(){
    this.toastr.error("Token Expire");
    this.logout();
  }
}
