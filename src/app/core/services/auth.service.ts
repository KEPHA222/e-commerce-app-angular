import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>('https://dummyjson.com/auth/login', credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
