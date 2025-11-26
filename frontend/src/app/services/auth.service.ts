import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin() {
    const user = this.getUser();
    return user && user.admin;
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}