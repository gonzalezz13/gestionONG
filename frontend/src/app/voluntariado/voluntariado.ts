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
    dificultad: 'Todas',
    fecha: 'Todas'
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
      const hoy = new Date();
      const fechaTarea = new Date(t.activityDate);

      const esFutura = fechaTarea >= hoy;
      const estaActiva = t.status !== 'finalizada' && t.status !== 'cancelada';

      const cumpleCategoria = this.filtros.categoria === 'Todas' || 
                             t.category.toLowerCase() === this.filtros.categoria.toLowerCase();
      
      const cumpleDificultad = this.filtros.dificultad === 'Todas' || 
                              t.difficulty === this.filtros.dificultad;

      let cumpleFechaManual = true;
      if (this.filtros.fecha !== 'Todas') {
        if (this.filtros.fecha === '7dias') {
          const dentroDe7Dias = new Date();
          dentroDe7Dias.setDate(hoy.getDate() + 7);
          cumpleFechaManual = fechaTarea >= hoy && fechaTarea <= dentroDe7Dias;
        } else if (this.filtros.fecha === 'mes') {
          cumpleFechaManual = fechaTarea.getMonth() === hoy.getMonth() && 
                             fechaTarea.getFullYear() === hoy.getFullYear();
        }
      }

      return esFutura && estaActiva && cumpleCategoria && cumpleDificultad && cumpleFechaManual;
    });
  }

  setCategoria(cat: string) {
    this.filtros.categoria = cat;
  }

  setDificultad(dif: string) {
    this.filtros.dificultad = dif;
  }

  setFecha(valor: string) {
    this.filtros.fecha = valor;
  }

  esVistaCuadricula: boolean = true;
}
