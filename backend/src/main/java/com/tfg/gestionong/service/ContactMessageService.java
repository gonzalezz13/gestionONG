package com.tfg.gestionong.service;

import com.tfg.gestionong.model.ContactMessage;
import com.tfg.gestionong.model.ChatMessage;
import com.tfg.gestionong.repository.ContactMessageRepository;
import com.tfg.gestionong.repository.ChatMessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.ArrayList;

@Service
@AllArgsConstructor
@Transactional
public class ContactMessageService {

    private final ContactMessageRepository repository;
    private final ChatMessageRepository chatMessageRepository;

    public ContactMessage saveMessage(ContactMessage message) {
        return repository.save(message);
    }

    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }

    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }

    public List<ContactMessage> getMessagesByEmail(String email) {
        return repository.findByEmail(email);
    }

    public ContactMessage replyToMessage(Long id, String respuesta) {
        ContactMessage message = repository.findById(id).orElse(null);
        if (message != null) {
            message.setRespuesta(respuesta);
            message.setFechaRespuesta(java.time.LocalDateTime.now());
            return repository.save(message);
        }
        return null;
    }

    public ContactMessage markAsRead(Long id) {
        ContactMessage message = repository.findById(id).orElse(null);
        if (message != null) {
            message.setLeido(true);
            return repository.save(message);
        }
        return null;
    }

    public ChatMessage saveChatMessage(Long contactMessageId, ChatMessage chatMessage) {
        ContactMessage parent = repository.findById(contactMessageId)
            .orElseThrow(() -> new RuntimeException("No existe la conversación con ID: " + contactMessageId));

        chatMessage.setContactMessage(parent);
        if (parent.getChatMessages() == null) {
            parent.setChatMessages(new ArrayList<>());
        }
        parent.getChatMessages().add(chatMessage);

        repository.save(parent);
        ChatMessage saved = chatMessageRepository.saveAndFlush(chatMessage);
        
        if (Boolean.TRUE.equals(chatMessage.getAdmin())) {
            parent.setRespuesta(chatMessage.getContent());
            parent.setFechaRespuesta(chatMessage.getTimestamp());
            parent.setLeido(true);
        } else {
            parent.setLeido(false);
        }
        repository.saveAndFlush(parent);

        return saved;
    }
}
