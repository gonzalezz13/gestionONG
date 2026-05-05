package com.tfg.gestionong.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.startsWith("/auth/login") || path.startsWith("/auth/register");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            try {
                String token = header.substring(7);
                if (jwtUtil.isTokenValid(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                    String email = jwtUtil.extractEmail(token);
                    String role = jwtUtil.extractRole(token);
                    
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            email, null, List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                    );
                    SecurityContext context = SecurityContextHolder.createEmptyContext();
                    context.setAuthentication(auth);
                    SecurityContextHolder.setContext(context);
                }
            } catch (Exception e) {
            }
        }

        filterChain.doFilter(request, response);
    }
}
