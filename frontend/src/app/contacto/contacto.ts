import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  contacto = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    privacidad: false,
    leido: false
  };
  
  enviando: boolean = false;
  mostrarExito: boolean = false;
  mostrarError: boolean = false;
  mensajeError: string = '';

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.enviando = true;
    this.mostrarError = false;
    this.mensajeError = '';
    
    this.contactService.sendMessage(this.contacto).subscribe({
      next: () => {
        this.enviando = false;
        this.mostrarExito = true;
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error enviando mensaje:', err);
        this.enviando = false;
        this.mostrarError = true;
        this.mensajeError = 'No se ha podido enviar el mensaje. Comprueba tu conexión o inténtalo más tarde.';
        this.cdr.detectChanges();
      }
    });
  }

  resetForm() {
    this.contacto = {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
      privacidad: false,
      leido: false
    };
  }

  cerrarExito() {
    this.mostrarExito = false;
  }
}
