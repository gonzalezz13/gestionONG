package com.tfg.gestionong.security;

import lombok.AllArgsConstructor;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/error/**", "/error").permitAll()
                        .requestMatchers(HttpMethod.POST, "/contact").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/contact").permitAll()
                        .requestMatchers(HttpMethod.GET, "/contact/my-messages").authenticated()
                        .requestMatchers(HttpMethod.POST, "/contact/*/chat").authenticated()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/ws-chat/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/noticias/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/noticias").permitAll()
                        .requestMatchers("/noticias/**").hasRole("ADMIN")
                        .requestMatchers("/noticias").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/activities/propuestas").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/activities/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/activities").permitAll()
                        .requestMatchers(HttpMethod.POST, "/activities").authenticated()
                        .requestMatchers("/activities/**").hasRole("ADMIN")
                        .requestMatchers("/activities").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/directrices/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/directrices").permitAll()
                        .requestMatchers("/directrices/**").hasRole("ADMIN")
                        .requestMatchers("/directrices").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/enrollments/**").authenticated()
                        .requestMatchers("/enrollments/**").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        var configuration = new org.springframework.web.cors.CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        var source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
