import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GuidelineService, Guideline } from '../services/guideline.service';

@Component({
  selector: 'app-directrices',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './directrices.html',
  styleUrl: './directrices.css',
})
export class Directrices implements OnInit {
  directrices: Guideline[] = [];
  directricesFiltradas: Guideline[] = [];
  categoriaActiva: string = 'Todos los recursos';
  ordenActivo: boolean = false;

  private meses: { [key: string]: number } = {
    'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11
  };

  constructor(private guidelineService: GuidelineService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarDirectrices();
  }

  cargarDirectrices(): void {
    this.guidelineService.getGuidelines().subscribe({
      next: (data) => {
        // Orden alfabético por defecto para que no sea un caos
        this.directrices = data.sort((a, b) => a.title.localeCompare(b.title));
        this.directricesFiltradas = [...this.directrices];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando directrices:', err)
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.ordenActivo = false; // Reset orden al cambiar categoría
    this.aplicarFiltros();
  }

  buscarDirectrices(event: any): void {
    const texto = event.target.value;
    this.aplicarFiltros(texto);
  }

  private aplicarFiltros(textoBusqueda: string = ''): void {
    let resultado = [...this.directrices];

    // Filtrar por categoría
    if (this.categoriaActiva !== 'Todos los recursos') {
      resultado = resultado.filter(d => 
        d.category.toLowerCase() === this.categoriaActiva.toLowerCase()
      );
    }

    // Filtrar por texto (título solamente)
    if (textoBusqueda) {
      const normalizar = (t: string) => 
        t.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
      
      const busqueda = normalizar(textoBusqueda);
      resultado = resultado.filter(d => normalizar(d.title).includes(busqueda));
    }

    this.directricesFiltradas = resultado;
    this.cdr.detectChanges();
  }

  ordenarPorRecientes(): void {
    this.ordenActivo = !this.ordenActivo;
    
    if (this.ordenActivo) {
      this.directricesFiltradas.sort((a, b) => {
        const fechaA = this.parseFecha(a.date);
        const fechaB = this.parseFecha(b.date);
        return fechaB.getTime() - fechaA.getTime();
      });
    } else {
      this.directricesFiltradas.sort((a, b) => a.title.localeCompare(b.title));
    }
    this.cdr.detectChanges();
  }

  descargarDocumento(doc: Guideline): void {
    if (!doc.downloadUrl) {
      console.warn('Este documento no tiene una URL de descarga configurada.');
      return;
    }
    
    // Aseguramos que la URL empiece con / si no la tiene
    const url = doc.downloadUrl.startsWith('/') ? doc.downloadUrl : '/' + doc.downloadUrl;
    console.log('Intentando abrir/descargar:', url);
    
    // Si es PDF, lo abrimos en pestaña nueva para visualización directa
    if (url.toLowerCase().endsWith('.pdf')) {
      window.open(url, '_blank');
    } else {
      // Para otros archivos (DOCX, etc), forzamos descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.title);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private parseFecha(fechaStr: string): Date {
    const partes = fechaStr.split(' ');
    const mesIndex = this.meses[partes[0]] !== undefined ? this.meses[partes[0]] : 0;
    const dia = parseInt(partes[1]) || 1;
    
    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    
    let anioDoc = anioActual;
    if (mesIndex > hoy.getMonth()) {
      anioDoc = anioActual - 1;
    }
    
    return new Date(anioDoc, mesIndex, dia);
  }

  getIconClass(color: string): string {
    switch (color?.toLowerCase()) {
      case 'red': return 'pdf-icon';
      case 'blue': return 'doc-icon-blue';
      case 'yellow': return 'doc-icon-yellow';
      case 'green': return 'doc-icon-green';
      case 'purple': return 'doc-icon-purple';
      case 'orange': return 'doc-icon-orange';
      default: return 'doc-icon-blue';
    }
  }

  getBadgeClass(category: string): string {
    switch (category?.toUpperCase()) {
      case 'MISIÓN': return 'badge-mission';
      case 'OPERACIONES': return 'badge-ops';
      case 'LEGAL': return 'badge-legal';
      case 'SEGURIDAD': return 'badge-safety';
      case 'REPORTES': return 'badge-reports';
      case 'COMUNICACIÓN': return 'badge-comm';
      default: return 'badge-ops';
    }
  }
}
