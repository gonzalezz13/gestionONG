import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService, Activity } from '../services/activity.service';

@Component({
  selector: 'app-voluntariado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voluntariado.html',
  styleUrl: './voluntariado.css',
})
export class Voluntariado implements OnInit {
  tareas: Activity[] = [];
  loading = true;

  filtros = {
    categoria: 'Todas',
    dificultad: 'Todas'
  };

  constructor(
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas() {
    console.log('Iniciando carga de tareas desde el backend...');
    this.activityService.getActivities().subscribe({
      next: (data) => {
        console.log('Datos recibidos con éxito:', data);
        this.tareas = data;
        this.loading = false;
        // Forzamos a Angular a que actualice la vista ahora mismo
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error crítico cargando actividades:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get tareasFiltradas() {
    if (!this.tareas) return [];
    return this.tareas.filter(t => {
      if (this.filtros.categoria === 'Todas') return true;
      return t.category.toLowerCase() === this.filtros.categoria.toLowerCase();
    });
  }

  setCategoria(cat: string) {
    this.filtros.categoria = cat;
  }

  setDificultad(dif: string) {
    this.filtros.dificultad = dif;
  }
}
