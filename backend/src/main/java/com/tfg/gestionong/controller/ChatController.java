package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.ChatMessage;
import com.tfg.gestionong.service.ContactMessageService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class ChatController {

    private final ContactMessageService contactMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{conversationId}")
    public void processMessage(@DestinationVariable Long conversationId, @Payload ChatMessage chatMessage) {
        ChatMessage saved = contactMessageService.saveChatMessage(conversationId, chatMessage);
        if (saved != null) {
            // Notificar a los suscritos a esta conversación
            messagingTemplate.convertAndSend("/topic/messages/" + conversationId, saved);
            
            // También podríamos notificar a un canal global de admins si el remitente no es admin
            if (chatMessage.getAdmin() == null || !chatMessage.getAdmin()) {
                messagingTemplate.convertAndSend("/topic/admin/notifications", saved);
            }
        }
    }
}
