package com.tfg.gestionong.controller;

import com.tfg.gestionong.dto.LoginRequest;
import com.tfg.gestionong.dto.LoginResponse;
import com.tfg.gestionong.dto.RegisterRequest;
import com.tfg.gestionong.model.User;
import com.tfg.gestionong.repository.UsersRepository;
import com.tfg.gestionong.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

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
        return ResponseEntity.ok(new LoginResponse(token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return ResponseEntity.ok("Sin autenticación");
        }
        return ResponseEntity.ok("principal=" + auth.getName() + " | authorities=" + auth.getAuthorities() + " | authenticated=" + auth.isAuthenticated());
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
        user.setRol(registerRequest.getRol() != null ? registerRequest.getRol() : User.Rol.volunteer);

        return ResponseEntity.status(201).body(usersRepository.save(user));
    }
}
