import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { UpdateComponent } from './update/update.component';
import { InsertComponent } from './insert/insert.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './AuthGuard/auth.guard';

const routes: Routes = [
  { path: '',  redirectTo: '/home',  pathMatch: 'full' },  
  { path: 'home', canActivate:[AuthGuard], component: HomeComponent,  }, 
  { path: 'app',  canActivate:[AuthGuard], component: AppComponent }, 
  { path: 'update/:id', canActivate:[AuthGuard], component: UpdateComponent,  },
  { path: 'insert', canActivate:[AuthGuard], component: InsertComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component:LoginComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const nav = [
                    HomeComponent,
                    AppComponent,
                    UpdateComponent, 
                    InsertComponent, 
                    SignupComponent,
                    LoginComponent,
                    PageNotFoundComponent
                  ];
