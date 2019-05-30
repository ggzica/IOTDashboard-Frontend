import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { AuthService } from './services/auth.service';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';

const routes: Routes = [ 
  {
  path: '',
  redirectTo: 'dashboard/home',
  pathMatch: 'full'
  },
  {
    path:'login',
    component : LoginComponent,
  },
  {
    path:'dashboard/home',
    component : HomeComponent,
    canActivate:[AuthService]
  },
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 