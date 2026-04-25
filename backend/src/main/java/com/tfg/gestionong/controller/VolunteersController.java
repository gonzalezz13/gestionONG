package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.Volunteer;
import com.tfg.gestionong.service.VolunteersService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/volunteers")
public class VolunteersController {

    private final VolunteersService volunteersService;

    @PostMapping
    public ResponseEntity<Volunteer> createVolunteer(@RequestBody Volunteer volunteerToCreate) {
        Volunteer created = volunteersService.createVolunteer(volunteerToCreate);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerById(@PathVariable int id) {
        Volunteer volunteer = volunteersService.getVolunteerById(id);
        if (volunteer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(volunteer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Volunteer> updateVolunteer(@RequestBody Volunteer volunteerToUpdate, @PathVariable int id) {
        Volunteer updated = volunteersService.updateVolunteer(id, volunteerToUpdate);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVolunteer(@PathVariable int id) {
        Volunteer volunteer = volunteersService.getVolunteerById(id);
        if (volunteer == null) {
            return ResponseEntity.notFound().build();
        }
        volunteersService.deleteVolunteer(id);
        return ResponseEntity.noContent().build();
    }
}
