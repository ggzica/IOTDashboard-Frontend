import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL= 'http://127.0.0.1:8000/api/'
  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,private http: HttpClient , public snackBar: MatSnackBar,public router: Router) { }


  snackbarOpen(message: string) {
    this.snackBar.open(message, '', { duration: 1500, verticalPosition: 'top' });
  }

  login(email:string,password:string)
  {
    this.http.post<any>(this.BASE_URL+'login',{email:email.trim(),password:password.trim()}).subscribe(data=>{
        if(data.success == true )
        {
          console.log(data);
          let temp = data.user;
          temp['auth_token']=data.access_token;

          localStorage.setItem('user', JSON.stringify(temp));
          this.snackbarOpen('Welcome Back '+temp.name);
          this.router.navigateByUrl('/dashboard/home');
        }
        else
        {
          this.snackbarOpen(data.message);
        }
    })
  }

  logout() {
    let token = JSON.parse(this.localStorage.getItem('user')).auth_token;
    if (token != null) {
      this.http.post<any>(this.BASE_URL + 'logout', { token: token })
        .subscribe(data => {
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
          this.snackbarOpen(data.message);
        },
          error => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
          }
        );
    }

  }

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  isLoggedIn(): boolean {
    if (this.localStorage.getItem('user') != null)
      return true;
    else
      return false;
  }



}
