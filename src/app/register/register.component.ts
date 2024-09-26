import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { Register } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  message: string = '';
  register: Register = new Register();
 

  constructor(
    private http: HttpClient,
    private registerService: RegisterService
  ) {}

  registerFormTemplate() {
    this.registerService.registerForm(this.register).subscribe(
      (data) => {
        // console.log(data);
        this.message = 'Registered Successfully';
      },
      (error) => {
        console.log(error);
        this.message = 'Please enter the mandatory fields';
      }
    );
    this.register = new Register();
  }
}
