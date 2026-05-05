package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.ContactMessage;
import com.tfg.gestionong.model.ChatMessage;
import com.tfg.gestionong.service.ContactMessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ContactMessageController {

    private final ContactMessageService service;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage message) {
        try {
            return ResponseEntity.ok(service.saveMessage(message));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(service.getAllMessages());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        service.deleteMessage(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reply")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessage> replyMessage(@PathVariable Long id, @RequestBody java.util.Map<String, String> body) {
        String respuesta = body.get("respuesta");
        return ResponseEntity.ok(service.replyToMessage(id, respuesta));
    }

    @GetMapping("/my-messages")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ContactMessage>> getMyMessages(java.security.Principal principal) {
        return ResponseEntity.ok(service.getMessagesByEmail(principal.getName()));
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessage> markAsRead(@PathVariable Long id) {
        ContactMessage updated = service.markAsRead(id);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/chat")
    public ResponseEntity<ChatMessage> postChatMessage(@PathVariable Long id, @RequestBody ChatMessage chatMessage) {
        ChatMessage saved = service.saveChatMessage(id, chatMessage);
        return ResponseEntity.ok(saved);
    }
}
