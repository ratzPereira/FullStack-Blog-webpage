import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  username: string;
  passwordConfirm: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('http://localhost:3000/api/users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          console.log('token');
          localStorage.setItem('blog-token', token.access_token);
          return token;
        })
      );
  }

  register(user: RegisterForm) {
    return this.http
      .post<any>('http://localhost:3000/api/users/login', user)
      .pipe(map((user) => user));
  }
}
