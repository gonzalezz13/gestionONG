import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityService, Activity } from '../services/activity.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-voluntariado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voluntariado.html',
  styleUrl: './voluntariado.css',
})
export class Voluntariado implements OnInit {
  tareas: Activity[] = [];
  loading = true;
  esVistaCuadricula: boolean = true;
  mostrarModal: boolean = false;
  editandoId: number | null = null;

  filtros = {
    categoria: 'Todas',
    dificultad: 'Todas',
    fecha: 'Todas'
  };
  
  mensajeExito: string = '';
  mensajeError: string = '';

  nuevaTarea: any = {
    title: '',
    description: '',
    category: '',
    difficulty: '',
    activityDate: '',
    activityTime: '10:00',
    maxParticipants: 10,
    location: '',
    imageUrl: 'https://images.unsplash.com/photo-1668714742426-c47d8a0e6ae4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  constructor(
    private activityService: ActivityService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  abrirModalNuevaTarea() {
    this.editandoId = null;
    this.nuevaTarea = {
      title: '',
      description: '',
      category: '',
      difficulty: '',
      activityDate: '',
      activityTime: '10:00',
      maxParticipants: 10,
      location: '',
      imageUrl: 'https://images.unsplash.com/photo-1668714742426-c47d8a0e6ae4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditarTarea(tarea: Activity) {
    this.editandoId = tarea.id || null;
    
    // Extraer fecha y hora si viene en formato YYYY-MM-DDTHH:mm:ss
    let date = '';
    let time = '10:00';
    if (tarea.activityDate) {
      if (tarea.activityDate.includes('T')) {
        const parts = tarea.activityDate.split('T');
        date = parts[0];
        time = parts[1].substring(0, 5); // Coger HH:mm
      } else {
        date = tarea.activityDate;
      }
    }

    this.nuevaTarea = {
      title: tarea.title,
      description: tarea.description,
      category: tarea.category,
      difficulty: tarea.difficulty,
      activityDate: date,
      activityTime: time,
      maxParticipants: tarea.maxParticipants,
      location: tarea.location,
      imageUrl: tarea.imageUrl,
      status: tarea.status
    };
    
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mensajeExito = '';
    this.mensajeError = '';
    this.cdr.detectChanges();
  }

  guardarTarea() {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (!this.nuevaTarea.title || !this.nuevaTarea.description || !this.nuevaTarea.category || 
        !this.nuevaTarea.activityDate || !this.nuevaTarea.activityTime || !this.nuevaTarea.location) {
      this.mensajeError = 'Por favor, rellena todos los campos obligatorios.';
      return;
    }

    if (this.editandoId) {
      console.log('Actualizando tarea en el backend:', this.nuevaTarea);
      this.activityService.updateActivity(this.editandoId, this.nuevaTarea).subscribe({
        next: (res: any) => {
          this.cargarTareas(); 
          this.cerrarModal();
        },
        error: (err: any) => {
          console.error('Error actualizando tarea:', err);
          this.mensajeError = 'Error al actualizar la actividad. Asegúrate de tener permisos.';
          this.cdr.detectChanges();
        }
      });
    } else {
      console.log('Enviando nueva tarea al backend:', this.nuevaTarea);
      this.activityService.createActivity(this.nuevaTarea).subscribe({
        next: (res: any) => {
          this.cargarTareas(); 
          this.cerrarModal();
        },
        error: (err: any) => {
          console.error('Error creando tarea:', err);
          this.mensajeError = 'Error al crear la actividad. Asegúrate de tener permisos de administrador.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  cargarTareas() {
    this.loading = true;
    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.tareas = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando actividades:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get tareasFiltradas() {
    if (!this.tareas) return [];
    return this.tareas.filter(t => {
      const cumpleCategoria = this.filtros.categoria === 'Todas' || 
                             t.category.toLowerCase() === this.filtros.categoria.toLowerCase();
      const cumpleDificultad = this.filtros.dificultad === 'Todas' || 
                               t.difficulty === this.filtros.dificultad;
      return cumpleCategoria && cumpleDificultad;
    });
  }

  setCategoria(cat: string) {
    this.filtros.categoria = cat;
    this.cdr.detectChanges();
  }

  setDificultad(dif: string) {
    this.filtros.dificultad = dif;
    this.cdr.detectChanges();
  }

  setFecha(valor: string) {
    this.filtros.fecha = valor;
    this.cdr.detectChanges();
  }
}
