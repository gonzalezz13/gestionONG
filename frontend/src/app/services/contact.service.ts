import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface ContactMessage {
  id?: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  fechaEnvio?: string;
  respuesta?: string;
  fechaRespuesta?: string;
  leido?: boolean;
  privacidad?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/contact';

  constructor(private http: HttpClient, private authService: AuthService) { }

  sendMessage(message: any): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }

  getMessages(): Observable<ContactMessage[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ContactMessage[]>(this.apiUrl, { headers });
  }

  getMyMessages(): Observable<ContactMessage[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/my-messages`, { headers });
  }

  replyMessage(id: number, respuesta: string): Observable<ContactMessage> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ContactMessage>(`${this.apiUrl}/${id}/reply`, { respuesta }, { headers });
  }

  deleteMessage(id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  markAsRead(id: number): Observable<ContactMessage> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ContactMessage>(`${this.apiUrl}/${id}/read`, {}, { headers });
  }
}
