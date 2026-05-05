package com.tfg.gestionong.dto;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String token;
    private String newPassword;
}
