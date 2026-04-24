import { Component, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements AfterViewInit {
  voluntarioForm: FormGroup;
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(private fb: FormBuilder) {
    this.voluntarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fechaNacimiento: [''],
      disponibilidad: this.fb.group({
        Lunes: [false],
        Martes: [false],
        Miércoles: [false],
        Jueves: [false],
        Viernes: [false],
        Sábado: [false],
        Domingo: [false]
      }),
      areaInteres: [''],
      habilidades: ['']
    });
  }

  onSubmit() {
    if (this.voluntarioForm.valid) {
      console.log('Datos enviados:', this.voluntarioForm.value);
      alert('¡Aplicación enviada con éxito!');
      this.voluntarioForm.reset();
    } else {
      this.voluntarioForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.voluntarioForm.reset();
  }

  ngAfterViewInit() {
    const observadorStats = new IntersectionObserver((entradas) => {
      if (entradas[0].isIntersecting) {
        this.iniciarTodosLosContadores();
        observadorStats.disconnect();
      }
    }, { threshold: 0.1 });
    
    const seccionStats = document.querySelector('.stats-container');
    if (seccionStats) {
      if (seccionStats.getBoundingClientRect().top < window.innerHeight) {
        this.iniciarTodosLosContadores();
      } else {
        observadorStats.observe(seccionStats);
      }
    }
  }

  iniciarTodosLosContadores() {
    this.animarContador('cont-vol', 5000, false, '+');
    this.animarContador('cont-proy', 300, false, '');
    this.animarContador('cont-paises', 5, false, '');
  }

  animarContador(id: string, fin: number, esDecimal: boolean, sufijo: string) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    let valorActual = 0;
    const pasos = 50; 
    const incremento = fin / pasos;
    
    const temporizador = setInterval(() => {
      valorActual += incremento;
      
      if (valorActual >= fin) {
        valorActual = fin;
        clearInterval(temporizador);
      }

      let texto = esDecimal ? valorActual.toFixed(1) : Math.floor(valorActual).toString();
      
      // Añadimos comas a los miles si es mayor que 999
      if (!esDecimal && fin >= 1000) {
        texto = parseInt(texto, 10).toLocaleString('en-US');
      }

      elemento.innerText = texto + sufijo;
      
    }, 40); 
  }
}
