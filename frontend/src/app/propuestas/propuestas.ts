import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { ActivityService, Activity } from '../services/activity.service';

@Component({
  selector: 'app-propuestas',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, RouterLink],
  templateUrl: './propuestas.html',
  styleUrls: ['./propuestas.css']
})
// Component for managing activity proposals from volunteers
export class PropuestasComponent implements OnInit {
  propuestas: Activity[] = [];
  loading: boolean = true;
  esVistaCuadricula: boolean = true;
  mensajeExito: string = '';
  mensajeError: string = '';
  
  mostrarConfirmarBorrado: boolean = false;
  idTareaABorrar: number | null = null;

  constructor(
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPropuestas();
  }

  cargarPropuestas() {
    this.loading = true;
    this.activityService.getProposals().subscribe({
      next: (data) => {
        this.propuestas = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando propuestas:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  aprobarPropuesta(tarea: Activity) {
    const updated = { ...tarea, status: 'programada' };
    this.activityService.updateActivity(tarea.id!, updated).subscribe({
      next: () => {
        this.cargarPropuestas();
        this.mensajeExito = 'Propuesta aprobada y publicada en voluntariado.';
        this.cdr.detectChanges();
        setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 5000);
      },
      error: (err) => {
        console.error('Error al aprobar propuesta:', err);
        this.mensajeError = 'Error al aprobar la propuesta.';
        this.cdr.detectChanges();
      }
    });
  }

  rechazarPropuesta(id: number) {
    this.idTareaABorrar = id;
    this.mostrarConfirmarBorrado = true;
    this.cdr.detectChanges();
  }

  cerrarConfirmarBorrado() {
    this.mostrarConfirmarBorrado = false;
    this.idTareaABorrar = null;
    this.cdr.detectChanges();
  }

  confirmarBorrado() {
    if (this.idTareaABorrar) {
      this.activityService.deleteActivity(this.idTareaABorrar).subscribe({
        next: () => {
          this.cargarPropuestas();
          this.mensajeExito = 'Propuesta rechazada y eliminada.';
          this.cerrarConfirmarBorrado();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 5000);
        },
        error: (err) => {
          console.error('Error al rechazar propuesta:', err);
          this.mensajeError = 'Error al rechazar la propuesta.';
          this.cerrarConfirmarBorrado();
        }
      });
    }
  }
}
