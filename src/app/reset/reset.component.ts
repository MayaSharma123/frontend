import { Component } from '@angular/core';
import { ResetService } from './reset.service';
import { Reset } from './reset';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent {
  reset: Reset = new Reset();

  email: string | any;
  constructor(private resetService: ResetService) {}

  resetPasswordToken() {
    this.reset.token = localStorage.getItem('forgotToken');
    this.resetService.resetPassword(this.reset).subscribe(
      (data) => {
        // console.log(data);
        alert('Password reset successfully');
      },
      (error) => {
        console.log('Password reset failed', error);
      }
    );
    this.reset = new Reset();
    localStorage.clear();
  }
}
