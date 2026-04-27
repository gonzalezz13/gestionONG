import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Inicio } from './inicio/inicio';
import { Footer } from './footer/footer';
import { Noticias } from './noticias/noticias';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Inicio, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-angular');
}
