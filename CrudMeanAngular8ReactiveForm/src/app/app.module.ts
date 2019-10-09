import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, nav } from './app-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TokenInterceptService } from '../app/HttpIntercept/token-intercept.service';
import { AuthGuard } from './AuthGuard/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
     nav,
     AppComponent,
     SignupComponent,
     LoginComponent,
     PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut:3000, positionClass: 'toast-top-right', preventDuplicates:true }),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptService,
      multi:true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
