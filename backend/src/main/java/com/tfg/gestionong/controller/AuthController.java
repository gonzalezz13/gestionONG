package com.tfg.gestionong.controller;

import com.tfg.gestionong.dto.*;
import com.tfg.gestionong.model.User;
import com.tfg.gestionong.repository.UsersRepository;
import com.tfg.gestionong.security.JwtUtil;
import com.tfg.gestionong.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        User user = usersRepository.findByEmail(loginRequest.getEmail());
        String token = jwtUtil.generateToken(user.getEmail(), user.getRol().name());
        return ResponseEntity.ok(new LoginResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRol().name()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Sin autenticación");
        }
        User user = usersRepository.findByEmail(auth.getName());
        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
        return ResponseEntity.ok(new LoginResponse(null, user.getId(), user.getName(), user.getEmail(), user.getRol().name()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (usersRepository.findByEmail(registerRequest.getEmail()) != null) {
            return ResponseEntity.status(409).body("El email ya está registrado");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setBirthDate(registerRequest.getBirthDate());
        user.setAboutMe(registerRequest.getAboutMe());
        user.setAreaInteres(registerRequest.getAreaInteres());
        user.setDisponibilidad(registerRequest.getDisponibilidad());
        user.setRol(registerRequest.getRol() != null ? registerRequest.getRol() : User.Rol.volunteer);

        return ResponseEntity.status(201).body(usersRepository.save(user));
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        User user = usersRepository.findByEmail(request.getEmail());
        if (user == null) {
            // Por seguridad, no decimos si el email existe o no, pero aquí devolvemos 200 siempre
            return ResponseEntity.ok().body(java.util.Map.of("message", "Si el email existe, se ha enviado un enlace de recuperación."));
        }

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        usersRepository.save(user);

        String resetLink = "http://localhost:4200/reset-password?token=" + token;
        
        // Ejecutamos el envío en un hilo totalmente separado para no bloquear la respuesta
        new Thread(() -> {
            try {
                emailService.sendEmail(user.getEmail(), "Recuperación de contraseña - GestionONG",
                        "Haz clic en el siguiente enlace para reestablecer tu contraseña: " + resetLink);
            } catch (Exception e) {
                System.err.println("Error enviando email en segundo plano: " + e.getMessage());
            }
        }).start();

        return ResponseEntity.ok().body(java.util.Map.of("message", "Si el email existe, se ha enviado un enlace de recuperación."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        User user = usersRepository.findByResetToken(request.getToken());

        if (user == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(400).body("Token inválido o caducado");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        usersRepository.save(user);

        return ResponseEntity.ok().body(java.util.Map.of("message", "Contraseña actualizada correctamente"));
    }
}
