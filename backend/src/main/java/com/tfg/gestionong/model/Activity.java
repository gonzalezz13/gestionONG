package com.tfg.gestionong.model;

import com.tfg.gestionong.converter.ActivityStatusConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    private String description;

    private String location;

    @Column(nullable = false)
    private LocalDateTime activityDate;

    private Integer maxParticipants;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Convert(converter = ActivityStatusConverter.class)
    private Status status;

    public enum Category {
        social, ambiental, educativa, salud
    }

    public enum Status {
        programada("programada"),
        EN_CURSO("en curso"),
        finalizada("finalizada"),
        cancelada("cancelada");

        private final String dbValue;

        Status(String dbValue) {
            this.dbValue = dbValue;
        }

        public String getDbValue() {
            return dbValue;
        }

        public static Status fromDbValue(String value) {
            for (Status s : values()) {
                if (s.dbValue.equals(value)) return s;
            }
            throw new IllegalArgumentException("Unknown status: " + value);
        }
    }
}
