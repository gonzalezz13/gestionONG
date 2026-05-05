import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactMessage } from '../services/contact.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css']
})
export class MensajesComponent implements OnInit {
  messages: ContactMessage[] = [];
  loading: boolean = true;
  selectedMessage: ContactMessage | null = null;
  replyText: string = '';
  enviandoRespuesta: boolean = false;
  showDeleteModal: boolean = false;
  messageToDelete: number | null = null;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes() {
    this.loading = true;
    this.contactService.getMessages().subscribe({
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

  getUnreadCount(): number {
    return this.messages.filter(m => !m.leido).length;
  }

  viewMessage(msg: ContactMessage) {
    this.selectedMessage = msg;
    this.replyText = '';
    
    if (!msg.leido && msg.id) {
      this.contactService.markAsRead(msg.id).subscribe(() => {
        msg.leido = true;
        this.cdr.detectChanges();
      });
    }
    this.cdr.detectChanges();
  }

  sendReply() {
    if (!this.selectedMessage?.id || !this.replyText.trim()) return;

    this.enviandoRespuesta = true;
    this.contactService.replyMessage(this.selectedMessage.id, this.replyText).subscribe({
      next: (updated) => {
        this.selectedMessage!.respuesta = updated.respuesta;
        this.selectedMessage!.fechaRespuesta = updated.fechaRespuesta;
        
        const index = this.messages.findIndex(m => m.id === updated.id);
        if (index !== -1) {
          this.messages[index] = updated;
        }
        
        this.replyText = '';
        this.enviandoRespuesta = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al responder:', err);
        this.enviandoRespuesta = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmDelete(id: number) {
    this.messageToDelete = id;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.messageToDelete = null;
  }

  executeDelete() {
    if (this.messageToDelete) {
      this.contactService.deleteMessage(this.messageToDelete).subscribe(() => {
        this.messages = this.messages.filter(m => m.id !== this.messageToDelete);
        if (this.selectedMessage?.id === this.messageToDelete) {
          this.selectedMessage = null;
        }
        this.showDeleteModal = false;
        this.messageToDelete = null;
        this.cdr.detectChanges();
      });
    }
  }
}
