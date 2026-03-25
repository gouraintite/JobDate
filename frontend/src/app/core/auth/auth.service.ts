import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginPayload, RegisterPayload, UserRole } from '../models/user.model';

const TOKEN_KEY = 'jd_token';
const ROLE_KEY = 'jd_role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  readonly isLoggedIn = signal(!!localStorage.getItem(TOKEN_KEY));
  readonly userRole = signal<UserRole | null>(localStorage.getItem(ROLE_KEY) as UserRole | null);

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: RegisterPayload): Observable<{ success: boolean; data: AuthResponse }> {
    return this.http
      .post<{ success: boolean; data: AuthResponse }>(`${this.apiUrl}/auth/register`, payload)
      .pipe(tap(({ data }) => this.saveSession(data)));
  }

  login(payload: LoginPayload): Observable<{ success: boolean; data: AuthResponse }> {
    return this.http
      .post<{ success: boolean; data: AuthResponse }>(`${this.apiUrl}/auth/login`, payload)
      .pipe(tap(({ data }) => this.saveSession(data)));
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    this.isLoggedIn.set(false);
    this.userRole.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private saveSession(auth: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, auth.token);
    localStorage.setItem(ROLE_KEY, auth.role);
    this.isLoggedIn.set(true);
    this.userRole.set(auth.role);
  }
}
