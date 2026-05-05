package com.tfg.gestionong.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String asunto;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String mensaje;

    @Column(nullable = false)
    private LocalDateTime fechaEnvio = LocalDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String respuesta;

    private LocalDateTime fechaRespuesta;

    @com.fasterxml.jackson.annotation.JsonProperty("leido")
    private Boolean leido = false;

    @com.fasterxml.jackson.annotation.JsonProperty("privacidad")
    private Boolean privacidad = false;

    @OneToMany(mappedBy = "contactMessage", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("timestamp ASC")
    @JsonManagedReference
    private java.util.List<ChatMessage> chatMessages = new java.util.ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (this.fechaEnvio == null) {
            this.fechaEnvio = LocalDateTime.now();
        }
        if (this.leido == null) {
            this.leido = false;
        }
        if (this.privacidad == null) {
            this.privacidad = false;
        }
    }
}
