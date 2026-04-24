import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  resumen: string;
  imagen: string;
  categoria: string;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias {
  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Nueva campaña de reforestación en el Amazonas',
      fecha: '24 Abr 2026',
      resumen: 'Lanzamos una iniciativa para plantar más de 10,000 árboles nativos en zonas afectadas por la deforestación.',
      imagen: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
      categoria: 'Medio Ambiente'
    },
    {
      id: 2,
      titulo: 'Éxito en la Gala Benéfica Anual',
      fecha: '15 Mar 2026',
      resumen: 'Gracias a vuestra generosidad, hemos recaudado fondos suficientes para abrir tres nuevos centros educativos.',
      imagen: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      categoria: 'Eventos'
    },
    {
      id: 3,
      titulo: 'Programa de formación para jóvenes voluntarios',
      fecha: '02 Feb 2026',
      resumen: 'Abrimos las inscripciones para el nuevo curso intensivo de liderazgo social y gestión de proyectos comunitarios.',
      imagen: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
      categoria: 'Educación'
    },
    {
      id: 4,
      titulo: 'Alianza estratégica con Salud Global',
      fecha: '20 Ene 2026',
      resumen: 'Unimos fuerzas para llevar suministros médicos básicos a comunidades remotas en el sudeste asiático.',
      imagen: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
      categoria: 'Salud'
    },
    {
      id: 5,
      titulo: 'Impacto social: Informe del primer trimestre',
      fecha: '10 Ene 2026',
      resumen: 'Analizamos los logros alcanzados en estos primeros meses del año y los retos que nos quedan por delante.',
      imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      categoria: 'Corporativo'
    }
  ];

  noticiasFiltradas: Noticia[] = [...this.noticias];
  categoriaActiva: string = 'Todas';

  filtrar(categoria: string) {
    this.categoriaActiva = categoria;
    if (categoria === 'Todas') {
      this.noticiasFiltradas = [...this.noticias];
    } else {
      this.noticiasFiltradas = this.noticias.filter(n => n.categoria === categoria);
    }
  }
}
