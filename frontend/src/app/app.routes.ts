import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Formulario } from './formulario/formulario';
import { Directrices } from './directrices/directrices';
import { Contacto } from './contacto/contacto';
import { Privacidad } from './privacidad/privacidad';
import { Terminos } from './terminos/terminos';
import { Noticias } from './noticias/noticias';
import { Voluntariado } from './voluntariado/voluntariado';
import { Login } from './auth/login/login';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { ResetPassword } from './auth/reset-password/reset-password';
import { MisTareas } from './mis-tareas/mis-tareas';
import { PropuestasComponent } from './propuestas/propuestas';
import { ParticipantesComponent } from './participantes/participantes';
import { MensajesComponent } from './mensajes/mensajes';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'login', component: Login },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'formulario', component: Formulario },
  { path: 'directrices', component: Directrices },
  { path: 'noticias', component: Noticias },
  { path: 'voluntariado', component: Voluntariado },
  { path: 'mis-tareas', component: MisTareas },
  { path: 'propuestas', component: PropuestasComponent },
  { path: 'participantes', component: ParticipantesComponent },
  { path: 'mensajes', component: MensajesComponent },
  { path: 'mis-mensajes', loadComponent: () => import('./mis-mensajes/mis-mensajes').then(m => m.MisMensajesComponent) },
  { path: 'contacto', component: Contacto },
  { path: 'privacidad', component: Privacidad },
  { path: 'terminos', component: Terminos },
  { path: '**', redirectTo: '' }
];
