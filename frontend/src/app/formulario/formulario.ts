import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  loginError = '';
  showSuccessModal = false;
  formError = ''; 

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.voluntarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      areaInteres: this.fb.group({
        educacion: [false],
        sanidad: [false],
        medioAmbiente: [false],
        comunidad: [false],
        logistica: [false]
      }),
      otroArea: [''],
      habilidades: ['']
    });
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

  onSubmit() {
    if (this.voluntarioForm.valid) {
      const formValue = this.voluntarioForm.value;
      const fullName = `${formValue.nombre} ${formValue.apellidos}`;
      const selectedDays = Object.keys(formValue.disponibilidad)
        .filter(day => formValue.disponibilidad[day])
        .join(', ');

      const labelsInteres: { [key: string]: string } = {
        educacion: 'Educación',
        sanidad: 'Sanidad',
        medioAmbiente: 'Medio Ambiente',
        comunidad: 'Comunidad',
        logistica: 'Logística'
      };
      
      const areasSeleccionadas = Object.keys(formValue.areaInteres)
        .filter(key => formValue.areaInteres[key])
        .map(key => labelsInteres[key]);
      
      if (formValue.otroArea) {
        areasSeleccionadas.push(formValue.otroArea);
      }
      
      const allInterests = areasSeleccionadas.join(', ');

      const userData = {
        name: fullName,
        email: formValue.email,
        password: formValue.password,
        phoneNumber: formValue.telefono,
        birthDate: formValue.fechaNacimiento,
        aboutMe: formValue.habilidades,
        areaInteres: allInterests,
        disponibilidad: selectedDays
      };

      this.authService.register(userData).subscribe({
        next: (response: any) => {
          console.log('Registro exitoso en el servidor:', response);
          this.formError = ''; 
          this.showSuccessModal = true;
          this.cdr.detectChanges(); // Forzamos el refresco para mostrar el modal
        },
        error: (error: any) => {
          console.error('Error en el registro:', error);
          if (error.status === 409) {
            this.formError = 'Este correo electrónico ya está registrado. Prueba con otro o inicia sesión.';
          } else {
            this.formError = 'Hubo un fallo al registrarse. Inténtalo de nuevo.';
          }
          this.cdr.detectChanges(); // Forzamos el refresco para mostrar el error
        }
      });
    } else {
      this.formError = 'Por favor, revisa el formulario. Hay campos obligatorios o con formato incorrecto.';
      this.voluntarioForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showSuccessModal = false;
    this.voluntarioForm.reset();
    this.router.navigate(['/login']);
  }

  onCancel() {
    this.voluntarioForm.reset();
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
      
      if (!esDecimal && fin >= 1000) {
        texto = parseInt(texto, 10).toLocaleString();
      }

      elemento.innerText = texto + sufijo;
      
    }, 60); 
  }
}
