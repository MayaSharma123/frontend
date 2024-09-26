import { Component } from '@angular/core';
import { ForgotService } from './forgot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  email: string | any;
  constructor(private forgotService: ForgotService, private router: Router) {}

  getForgotToken(email: string | any) {
    this.forgotService.getToken(email).subscribe(
      (data) => {
        // console.log(data);
        localStorage.setItem('forgotToken', data);
        this.router.navigateByUrl('/reset');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
