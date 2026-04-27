package com.tfg.gestionong.dto;

import com.tfg.gestionong.model.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private LocalDate birthDate;
    private String aboutMe;
    private User.Rol rol;
}
