package com.tfg.gestionong.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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

    private LocalDate birthDate;

    private String phoneNumber;

    private String aboutMe;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    public enum Rol {
        volunteer, admin
    }
}
