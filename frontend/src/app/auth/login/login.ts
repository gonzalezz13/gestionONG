import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginEmail = '';
  loginPassword = '';
  loginError = '';
  loginLoading = false;
  showPassword = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  onLogin() {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError = 'Por favor, introduce tu email y contraseña';
      return;
    }
    
    this.loginLoading = true;
    this.loginError = '';

    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: () => {
        this.loginLoading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/']);
      },
      error: () => {
        this.loginLoading = false;
        this.loginError = 'Credenciales incorrectas. Inténtalo de nuevo.';
        this.cdr.detectChanges(); 
      }
    });
  }
}
