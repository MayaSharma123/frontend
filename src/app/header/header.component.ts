import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
 
  constructor(private router: Router) {}
 
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    alert('You have been logged out successfully');
  }
}
