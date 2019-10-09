import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Service/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthenticationService,
            private route:Router) 
  {    }

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    else{
      this.route.navigateByUrl('/login');
    }
  }
  
}
