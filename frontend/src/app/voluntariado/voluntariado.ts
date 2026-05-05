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
  limiteMostrar: number = 6;
  esModoPropuesta: boolean = false;
  misInscripciones: any[] = [];
  
  mostrarConfirmarBorrado: boolean = false;
  idTareaABorrar: number | null = null;

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
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    if (this.isLoggedIn()) {
      const user = this.authService.currentUser;
      if (user && user.id) {
        this.activityService.getUserEnrollments(user.id).subscribe({
          next: (data) => {
            this.misInscripciones = data;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error cargando inscripciones:', err)
        });
      }
    }
  }

  estaApuntado(activityId: number | undefined): boolean {
    if (!activityId) return false;
    return this.misInscripciones.some(insc => insc.activity.id === activityId);
  }

  apuntarse(activityId: number | undefined): void {
    if (!activityId) return;
    const user = this.authService.currentUser;
    if (user && user.id) {
      // Optimistic update: update local state immediately
      const tarea = this.tareas.find(t => t.id === activityId);
      if (tarea) {
        tarea.availablePlaces = Math.max(0, (tarea.availablePlaces ?? tarea.maxParticipants) - 1);
        tarea.currentParticipants = (tarea.currentParticipants ?? 0) + 1;
        this.misInscripciones = [...this.misInscripciones, { activity: tarea, status: 'inscrito' }];
        this.cdr.detectChanges();
      }
      this.activityService.enroll(user.id, activityId).subscribe({
        next: () => {
          this.mensajeExito = 'Te has apuntado correctamente a la actividad.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 3000);
        },
        error: (err) => {
          console.error('Error al apuntarse:', err);
          // Revert optimistic update on error
          this.cargarTareas();
          this.cargarInscripciones();
          this.mensajeError = 'Error al intentar apuntarse.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeError = ''; this.cdr.detectChanges(); }, 3000);
        }
      });
    }
  }

  desapuntarse(activityId: number | undefined): void {
    if (!activityId) return;
    const user = this.authService.currentUser;
    if (user && user.id) {
      // Optimistic update: update local state immediately
      const tarea = this.tareas.find(t => t.id === activityId);
      if (tarea) {
        tarea.availablePlaces = (tarea.availablePlaces ?? 0) + 1;
        tarea.currentParticipants = Math.max(0, (tarea.currentParticipants ?? 1) - 1);
        this.misInscripciones = this.misInscripciones.filter(insc => insc.activity.id !== activityId);
        this.cdr.detectChanges();
      }
      this.activityService.unenroll(user.id, activityId).subscribe({
        next: () => {
          this.mensajeExito = 'Te has desapuntado de la actividad.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 3000);
        },
        error: (err) => {
          console.error('Error al desapuntarse:', err);
          // Revert optimistic update on error
          this.cargarTareas();
          this.cargarInscripciones();
          this.mensajeError = 'Error al intentar desapuntarse.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeError = ''; this.cdr.detectChanges(); }, 3000);
        }
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  abrirModalNuevaTarea() {
    this.esModoPropuesta = false;
    this.prepararNuevaTarea();
  }

  abrirModalPropuesta() {
    this.esModoPropuesta = true;
    this.prepararNuevaTarea();
  }

  private prepararNuevaTarea() {
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
          this.mensajeExito = 'Actividad actualizada con éxito.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 5000);
        },
        error: (err: any) => {
          console.error('Error actualizando tarea:', err);
          this.mensajeError = 'Error al actualizar la actividad.';
          this.cdr.detectChanges();
        }
      });
    } else {
      console.log('Enviando nueva tarea al backend:', this.nuevaTarea);
      this.activityService.createActivity(this.nuevaTarea, this.esModoPropuesta).subscribe({
        next: (res: any) => {
          this.cargarTareas(); 
          this.cerrarModal();
          this.mensajeExito = (this.isAdmin() && !this.esModoPropuesta) ? 'Actividad creada con éxito.' : 'Tu propuesta ha sido enviada y está pendiente de aprobación.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 5000);
        },
        error: (err: any) => {
          console.error('Error creando tarea:', err);
          this.mensajeError = this.isAdmin() ? 'Error al crear la actividad.' : 'Error al enviar la propuesta.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  eliminarTarea(id: number) {
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
          this.mensajeExito = 'Actividad eliminada con éxito.';
          this.cargarTareas();
          this.cerrarConfirmarBorrado();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 5000);
        },
        error: (err) => {
          console.error('Error eliminando actividad:', err);
          this.mensajeError = 'No se pudo eliminar la actividad.';
          this.cerrarConfirmarBorrado();
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
    const ahora = new Date();
    return this.tareas.filter(t => {
      // Exclude activities that have already passed
      if (t.activityDate && new Date(t.activityDate) < ahora) return false;

      const cumpleCategoria = this.filtros.categoria === 'Todas' || 
                             t.category.toLowerCase() === this.filtros.categoria.toLowerCase();
      const cumpleDificultad = this.filtros.dificultad === 'Todas' || 
                               t.difficulty === this.filtros.dificultad;

      let cumpleFecha = true;
      if (this.filtros.fecha !== 'Todas' && t.activityDate) {
        const activityDate = new Date(t.activityDate);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (this.filtros.fecha === '7dias') {
          const proximos7 = new Date(hoy);
          proximos7.setDate(hoy.getDate() + 7);
          proximos7.setHours(23, 59, 59, 999);
          
          cumpleFecha = activityDate >= hoy && activityDate <= proximos7;
        } else if (this.filtros.fecha === 'mes') {
          cumpleFecha = activityDate.getMonth() === hoy.getMonth() && activityDate.getFullYear() === hoy.getFullYear();
        }
      }

      return cumpleCategoria && cumpleDificultad && cumpleFecha;
    });
  }

  get misInscripcionesFuturas() {
    const ahora = new Date();
    return this.misInscripciones.filter(insc =>
      !insc.activity?.activityDate || new Date(insc.activity.activityDate) >= ahora
    );
  }

  setCategoria(cat: string) {
    this.filtros.categoria = cat;
    this.limiteMostrar = 6;
    this.cdr.detectChanges();
  }

  setDificultad(dif: string) {
    this.filtros.dificultad = dif;
    this.limiteMostrar = 6;
    this.cdr.detectChanges();
  }

  setFecha(valor: string) {
    this.filtros.fecha = valor;
    this.limiteMostrar = 6;
    this.cdr.detectChanges();
  }

  verMasTareas() {
    this.limiteMostrar += 6;
    this.cdr.detectChanges();
  }
}
