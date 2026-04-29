import { Component } from '@angular/core';
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
  selectedRole: 'Volunteer' | 'Admin' = 'Volunteer';

  constructor(private authService: AuthService, private router: Router) {}

  selectRole(role: 'Volunteer' | 'Admin') {
    this.selectedRole = role;
  }

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
        this.router.navigate(['/']); // Redirige a inicio tras login
      },
      error: () => {
        this.loginLoading = false;
        this.loginError = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    });
  }
}
