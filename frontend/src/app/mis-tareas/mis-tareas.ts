import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../services/activity.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-tareas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-tareas.html',
  styleUrl: './mis-tareas.css'
})
export class MisTareas implements OnInit {
  misInscripciones: any[] = [];
  loading = true;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private activityService: ActivityService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.loading = true;
    const user = this.authService.currentUser;
    if (user && user.id) {
      this.activityService.getUserEnrollments(user.id).subscribe({
        next: (data) => {
          const ahora = new Date();
          // Only keep future activities
          this.misInscripciones = data.filter(insc =>
            !insc.activity?.activityDate || new Date(insc.activity.activityDate) >= ahora
          );
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error cargando inscripciones:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loading = false;
    }
  }

  desapuntarse(activityId: number): void {
    const user = this.authService.currentUser;
    if (user && user.id) {
      this.activityService.unenroll(user.id, activityId).subscribe({
        next: () => {
          this.cargarInscripciones();
          this.mensajeExito = 'Te has desapuntado de la actividad correctamente.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 3000);
        },
        error: (err) => {
          console.error('Error al desapuntarse:', err);
          this.mensajeError = 'Hubo un error al intentar desapuntarse.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeError = ''; this.cdr.detectChanges(); }, 3000);
        }
      });
    }
  }
}
