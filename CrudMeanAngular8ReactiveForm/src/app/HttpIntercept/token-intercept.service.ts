import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../Service/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptService implements HttpInterceptor{

  constructor(private authenticationService:AuthenticationService) { }

  intercept(req,next){
    const token = this.authenticationService.getToken();
    const header = req.clone({
      headers:req.headers.set('Authorization','bearer ' + token)
    })
    return next.handle(header);
  }
}
