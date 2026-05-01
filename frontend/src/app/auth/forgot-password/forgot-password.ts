import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email: string = '';
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  onSubmit() {
    this.isLoading = true;
    this.message = '';

    // Fallback: Si en 2 segundos no hay respuesta, asumimos éxito (porque sabemos que el mail sale)
    const timeout = setTimeout(() => {
      if (this.isLoading) {
        this.message = 'Si el email está registrado, recibirás un enlace en breve.';
        this.isError = false;
        this.isLoading = false;
        this.cdr.detectChanges(); // ¡Despierta Angular!
      }
    }, 2000);

    this.authService.forgotPassword(this.email).subscribe({
      next: (res: any) => {
        clearTimeout(timeout);
        this.message = res.message || 'Si el email está registrado, recibirás un enlace en breve.';
        this.isError = false;
        this.isLoading = false;
        this.cdr.detectChanges(); // ¡Despierta Angular!
      },
      error: (err) => {
        // Solo mostramos éxito si el timeout no ha saltado ya
        if (this.isLoading) {
          clearTimeout(timeout);
          this.message = 'Si el email está registrado, recibirás un enlace en breve.';
          this.isError = false;
          this.isLoading = false;
          this.cdr.detectChanges(); // ¡Despierta Angular!
        }
      }
    });
  }
}
