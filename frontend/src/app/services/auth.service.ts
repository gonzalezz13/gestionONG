import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse {
  token: string;
  id: number;
  name: string;
  email: string;
  rol: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private userSubject = new BehaviorSubject<UserInfo | null>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.initAuth();
  }

  private initAuth(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
    // Defer to avoid ExpressionChangedAfterItHasBeenCheckedError during init
    Promise.resolve().then(() => this.refreshUserInfo());
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        const userInfo: UserInfo = { id: res.id, name: res.name, email: res.email, rol: res.rol };
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(userInfo)); // Guardamos el usuario
        this.userSubject.next(userInfo);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Limpiamos todo
    this.userSubject.next(null);
    this.router.navigate(['/inicio']); // Redirigir al inicio al cerrar sesión
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  get currentUser(): UserInfo | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUser;
    return user?.rol?.toLowerCase() === 'admin';
  }

  private refreshUserInfo(): void {
    const token = this.getToken();
    if (token) {
      this.http.get<LoginResponse>(`${this.apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res) => {
          const userInfo: UserInfo = { id: res.id, name: res.name, email: res.email, rol: res.rol };
          localStorage.setItem('user', JSON.stringify(userInfo));
          this.userSubject.next(userInfo);
        },
        error: () => this.logout()
      });
    }
  }
}
