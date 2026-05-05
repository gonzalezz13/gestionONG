package com.tfg.gestionong.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "about_me")
    private String aboutMe;

    @Column(name = "interest_area")
    private String areaInteres;

    @Column(name = "availability")
    private String disponibilidad;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;

    public enum Rol {
        volunteer, admin
    }
}
