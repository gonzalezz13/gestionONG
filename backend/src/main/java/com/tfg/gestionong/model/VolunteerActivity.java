package com.tfg.gestionong.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "volunteers_activities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerActivity {

    @EmbeddedId
    private VolunteerActivityId id;

    @ManyToOne
    @MapsId("volunteerId")
    @JoinColumn(name = "volunteer_id")
    private Volunteer volunteer;

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
