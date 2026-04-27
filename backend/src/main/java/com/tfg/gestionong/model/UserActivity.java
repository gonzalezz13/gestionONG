package com.tfg.gestionong.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users_activities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserActivity {

    @EmbeddedId
    private UserActivityId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("activityId")
    @JoinColumn(name = "activity_id")
    private Activity activity;

    @Column(insertable = false, updatable = false)
    private LocalDateTime enrollmentDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        inscrito, asistio, cancelo, lista_espera
    }
}
