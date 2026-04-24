import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  ubicacion: string;
  categoria: string;
  dificultad: 'Baja' | 'Media' | 'Alta';
  cuposTotales: number;
  cuposInscritos: number;
  imagen: string;
}

@Component({
  selector: 'app-voluntariado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voluntariado.html',
  styleUrl: './voluntariado.css',
})
export class Voluntariado {
  tareas: Tarea[] = [
    {
      id: 1,
      titulo: 'Apoyo en Campaña de Vacunación',
      descripcion: 'Asistencia logística y orientación a ciudadanos durante la jornada de salud preventiva en el centro metropolitano.',
      fecha: '24 Octubre, 2023',
      hora: '09:00 - 14:00',
      ubicacion: 'Centro Salud Sur',
      categoria: 'SALUD',
      dificultad: 'Media',
      cuposTotales: 12,
      cuposInscritos: 8,
      imagen: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      titulo: 'Tutoría de Lectura Infantil',
      descripcion: 'Acompañamiento a niños de primaria para reforzar habilidades de comprensión lectora mediante juegos y...',
      fecha: '26 Octubre, 2023',
      hora: '16:00 - 18:00',
      ubicacion: 'Biblioteca Municipal',
      categoria: 'EDUCACIÓN',
      dificultad: 'Baja',
      cuposTotales: 5,
      cuposInscritos: 3,
      imagen: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      titulo: 'Reforestación Parque Central',
      descripcion: 'Plantación de especies autóctonas para la recuperación de zonas verdes degradadas en el pulmón de la ciudad.',
      fecha: '30 Octubre, 2023',
      hora: '08:00 - 13:00',
      ubicacion: 'Parque Central',
      categoria: 'MEDIO AMBIENTE',
      dificultad: 'Alta',
      cuposTotales: 50,
      cuposInscritos: 15,
      imagen: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      titulo: 'Organización de Banco de Alimentos',
      descripcion: 'Clasificación y empaquetado de donaciones recibidas para su posterior distribución a familias vulnerables.',
      fecha: '28 Octubre, 2023',
      hora: '10:00 - 15:00',
      ubicacion: 'Almacén General',
      categoria: 'SOCIAL',
      dificultad: 'Media',
      cuposTotales: 20,
      cuposInscritos: 12,
      imagen: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  filtros = {
    categoria: 'Todas',
    dificultad: 'Todas'
  };

  get tareasFiltradas() {
    return this.tareas.filter(t => {
      const matchCat = this.filtros.categoria === 'Todas' || t.categoria === this.filtros.categoria.toUpperCase();
      const matchDif = this.filtros.dificultad === 'Todas' || t.dificultad === this.filtros.dificultad;
      return matchCat && matchDif;
    });
  }

  setCategoria(cat: string) {
    this.filtros.categoria = cat;
  }

  setDificultad(dif: string) {
    this.filtros.dificultad = dif;
  }
}
