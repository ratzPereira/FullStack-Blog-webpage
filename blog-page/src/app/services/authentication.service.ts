import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<any>('http://localhost:3000/api/users/login', { email, password })
      .pipe(
        map((token) => {
          localStorage.setItem('blog-token', token.access_token);
          return token;
        })
      );
  }
}
