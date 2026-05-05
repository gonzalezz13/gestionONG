import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService, News } from '../services/news.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements OnInit {
  noticias: News[] = [];
  noticiasFiltradas: News[] = [];
  categorias: string[] = ['Todas', 'Medio Ambiente', 'Eventos', 'Educación', 'Salud', 'Corporativo'];
  categoriaActiva: string = 'Todas';

  mostrarModal = false;
  editandoId: number | null = null;
  mensajeExito = '';
  mensajeError = '';
  guardando = false;

  mostrarConfirmacion = false;
  noticiaAEliminar: number | null = null;

  nuevaNoticia: News = {
    title: '',
    date: '',
    summary: '',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    category: ''
  };

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  cargarNoticias(): void {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.noticias = data;
        this.aplicarFiltro();
        this.extraerCategorias();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando noticias:', err);
        this.cdr.detectChanges();
      }
    });
  }

  extraerCategorias() {
    const cats = this.noticias.map(n => n.category);
    const uniqueCats = ['Todas', ...new Set(cats)];
    if (uniqueCats.length > this.categorias.length) {
      this.categorias = uniqueCats;
    }
  }

  filtrar(categoria: string) {
    this.categoriaActiva = categoria;
    this.aplicarFiltro();
    this.cdr.detectChanges();
  }

  private aplicarFiltro() {
    this.noticiasFiltradas = this.categoriaActiva === 'Todas'
      ? [...this.noticias]
      : this.noticias.filter(n => n.category === this.categoriaActiva);
  }

  abrirModalNueva() {
    this.editandoId = null;
    this.mensajeError = '';
    this.guardando = false;
    this.nuevaNoticia = {
      title: '',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      summary: '',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
      category: ''
    };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditar(noticia: News) {
    this.editandoId = noticia.id || null;
    this.mensajeError = '';
    this.guardando = false;
    this.nuevaNoticia = { ...noticia };
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.guardando = false;
    this.cdr.detectChanges();
  }

  guardarNoticia() {
    if (this.guardando) return;
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.nuevaNoticia.title || !this.nuevaNoticia.summary || !this.nuevaNoticia.category) {
      this.mensajeError = 'Por favor, rellena todos los campos obligatorios.';
      this.cdr.detectChanges();
      return;
    }

    this.guardando = true;

    if (this.editandoId) {
      this.newsService.updateNews(this.editandoId, this.nuevaNoticia).subscribe({
        next: () => {
          this.cargarNoticias();
          this.cerrarModal();
          this.mensajeExito = 'Noticia actualizada con éxito.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 2500);
        },
        error: (err) => {
          console.error('Error al actualizar la noticia:', err);
          this.guardando = false;
          this.mensajeError = 'Error al actualizar la noticia.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.newsService.createNews(this.nuevaNoticia).subscribe({
        next: () => {
          this.cargarNoticias();
          this.cerrarModal();
          this.mensajeExito = 'Noticia creada con éxito.';
          this.cdr.detectChanges();
          setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 2500);
        },
        error: (err) => {
          console.error('Error al crear la noticia:', err);
          this.guardando = false;
          this.mensajeError = 'Error al crear la noticia.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  pedirConfirmacionEliminar(id: number | undefined) {
    if (!id) return;
    this.noticiaAEliminar = id;
    this.mostrarConfirmacion = true;
    this.cdr.detectChanges();
  }

  cancelarEliminacion() {
    this.noticiaAEliminar = null;
    this.mostrarConfirmacion = false;
    this.cdr.detectChanges();
  }

  confirmarEliminacion() {
    if (!this.noticiaAEliminar) return;
    this.newsService.deleteNews(this.noticiaAEliminar).subscribe({
      next: () => {
        this.noticiaAEliminar = null;
        this.mostrarConfirmacion = false;
        this.cargarNoticias();
        this.mensajeExito = 'Noticia eliminada correctamente.';
        this.cdr.detectChanges();
        setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 2500);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.cancelarEliminacion();
      }
    });
  }
}
