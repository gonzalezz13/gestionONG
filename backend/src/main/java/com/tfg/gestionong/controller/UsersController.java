package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.User;
import com.tfg.gestionong.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class UsersController {

    private final UsersService usersService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User userToCreate) {
        User created = usersService.createUser(userToCreate);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = usersService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User userToUpdate, @PathVariable int id) {
        User updated = usersService.updateUser(id, userToUpdate);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        User user = usersService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        usersService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
