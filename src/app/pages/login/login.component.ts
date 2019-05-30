import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public user: { email: string, password: string } = { email: '', password: '' };

  constructor( public formBuilder: FormBuilder,public auth:AuthService) { 

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.user.email, this.user.password);
    } else {
      this.auth.snackbarOpen('Please Fill All Fields');
    }
  }
}
