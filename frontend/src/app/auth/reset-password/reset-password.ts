import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  success: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.message = 'Token no válido. Por favor, solicita un nuevo enlace.';
      this.isError = true;
    }
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Las contraseñas no coinciden.';
      this.isError = true;
      return;
    }

    this.isLoading = true;
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Contraseña actualizada correctamente. Redirigiendo al login...';
        this.isError = false;
        this.isLoading = false;
        this.success = true;
        setTimeout(() => this.router.navigate(['/auth/login']), 3000);
      },
      error: (err) => {
        this.message = 'Error al actualizar la contraseña. El enlace puede haber caducado.';
        this.isError = true;
        this.isLoading = false;
      }
    });
  }
}
