import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService, ContactMessage } from '../services/contact.service';

@Component({
  selector: 'app-mis-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-mensajes.html',
  styleUrls: ['./mis-mensajes.css']
})
export class MisMensajesComponent implements OnInit {
  messages: ContactMessage[] = [];
  loading: boolean = true;
  selectedMessage: ContactMessage | null = null;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMisMensajes();
  }

  cargarMisMensajes() {
    this.loading = true;
    this.contactService.getMyMessages().subscribe({
      next: (data) => {
        this.messages = data.sort((a, b) => {
          if (!a.fechaEnvio || !b.fechaEnvio) return 0;
          return new Date(b.fechaEnvio).getTime() - new Date(a.fechaEnvio).getTime();
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewMessage(msg: ContactMessage) {
    this.selectedMessage = msg;
    this.cdr.detectChanges();
  }

  closeDetail() {
    this.selectedMessage = null;
    this.cdr.detectChanges();
  }

  getInitials(name: string): string {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
}
