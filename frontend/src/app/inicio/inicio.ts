import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})

export class Inicio implements AfterViewInit {
    ngAfterViewInit() {
    // Creamos un vigilante que avisa cuando las tarjetas entran en la pantalla
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada, i) => {
        if (entrada.isIntersecting) {
          // Si vemos la tarjeta, le añadimos la clase con retraso escalonado
          setTimeout(() => {
            entrada.target.classList.add('tarjeta-visible');
          }, i * 300);
          
          // Dejamos de vigilarla para que la animación solo ocurra una vez
          observer.unobserve(entrada.target); 
        }
      });
    });

    // Le decimos al vigilante que empiece a observar todas nuestras tarjetas
    document.querySelectorAll('.tarjeta').forEach((tarjeta, i) => {
      // Si la tarjeta ya está en pantalla o la hemos pasado de largo hacia abajo...
      if (tarjeta.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
          tarjeta.classList.add('tarjeta-visible');
        }, i * 300);
      } else {
        // Si sigue por debajo, la vigilamos
        observer.observe(tarjeta);
      }
    });

    // --- EFECTO CONTADOR ESTADÍSTICAS ---
    const observadorStats = new IntersectionObserver((entradas) => {
      if (entradas[0].isIntersecting) {
        this.iniciarTodosLosContadores();
        observadorStats.disconnect();
      }
    }, { threshold: 0.1 });
    
    const seccionStats = document.querySelector('.estadisticas');
    if (seccionStats) {
      if (seccionStats.getBoundingClientRect().top < window.innerHeight) {
        this.iniciarTodosLosContadores();
      } else {
        observadorStats.observe(seccionStats);
      }
    }
  }

  iniciarTodosLosContadores() {
    this.animarContador('cont-beneficiarios', 5, false, 'k+');
    this.animarContador('cont-proyectos', 200, false, '');
    this.animarContador('cont-horas', 1.1, true, 'M+');
  }

  animarContador(id: string, fin: number, esDecimal: boolean, sufijo: string) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    let valorActual = 0;
    // Dividimos la animación exactamente en 50 pasos para que todos acaben a la vez
    const pasos = 50; 
    const incremento = fin / pasos;
    
    const temporizador = setInterval(() => {
      valorActual += incremento;
      
      if (valorActual >= fin) {
        valorActual = fin;
        clearInterval(temporizador);
      }

      // Si es decimal mostramos 1 decimal (ej: 0.7), si no, lo redondeamos (ej: 4)
      const texto = esDecimal ? valorActual.toFixed(1) : Math.floor(valorActual).toString();
      
      // Añadimos siempre el sufijo para que sea un cambio suave
      elemento.innerText = texto + sufijo;
      
    }, 50); // 40ms por cada uno de los 50 pasos = 2 segundos totales de animación
  }
}
