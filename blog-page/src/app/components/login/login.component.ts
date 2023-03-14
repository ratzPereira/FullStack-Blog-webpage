import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private readonly authService: AuthenticationService) {}

  login() {
    this.authService
      .login('email1@email.com', '123456')
      .subscribe((data) => console.log('logged in'));
  }
}
