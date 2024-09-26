import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    loginId: '',
    password: '',
  };
  constructor(private httpClient: HttpClient, private router: Router) {}

  onLogin() {
    this.httpClient
      .post('http://localhost:8081/api/v1.0/shopping/login', this.loginObj)
      .subscribe(
        (data: any) => {
          // console.log(data);
          localStorage.setItem('loginId', this.loginObj.loginId);
          localStorage.setItem('loginToken', data.token);
          alert('Success');
          if (data.role === 'ROLE_ADMIN') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/product');
          }
        },
        (error: any) => {
          alert('Login failed: Incorrect username or password');
        }
      );
  }
}
