import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService) {} // Inject the AuthService

  // Example function to check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedInUser(); // Use the AuthService method
  }
}
