package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.VolunteerActivity;
import com.tfg.gestionong.model.VolunteerActivityId;
import com.tfg.gestionong.service.VolunteerActivityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/enrollments")
public class VolunteerActivityController {

    private final VolunteerActivityService volunteerActivityService;

    @PostMapping
    public ResponseEntity<VolunteerActivity> enroll(@RequestBody VolunteerActivity volunteerActivity) {
        VolunteerActivity created = volunteerActivityService.enroll(volunteerActivity);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{volunteerId}/{activityId}")
    public ResponseEntity<VolunteerActivity> getEnrollment(@PathVariable int volunteerId, @PathVariable int activityId) {
        VolunteerActivity enrollment = volunteerActivityService.getById(new VolunteerActivityId(volunteerId, activityId));
        if (enrollment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enrollment);
    }

    @PutMapping("/{volunteerId}/{activityId}")
    public ResponseEntity<VolunteerActivity> updateStatus(
            @PathVariable int volunteerId,
            @PathVariable int activityId,
            @RequestParam VolunteerActivity.Status status) {
        VolunteerActivity updated = volunteerActivityService.updateStatus(
                new VolunteerActivityId(volunteerId, activityId), status);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{volunteerId}/{activityId}")
    public ResponseEntity<Void> unenroll(@PathVariable int volunteerId, @PathVariable int activityId) {
        VolunteerActivityId id = new VolunteerActivityId(volunteerId, activityId);
        if (volunteerActivityService.getById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        volunteerActivityService.unenroll(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/volunteer/{volunteerId}")
    public ResponseEntity<List<VolunteerActivity>> getByVolunteer(@PathVariable int volunteerId) {
        return ResponseEntity.ok(volunteerActivityService.getByVolunteer(volunteerId));
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<VolunteerActivity>> getByActivity(@PathVariable int activityId) {
        return ResponseEntity.ok(volunteerActivityService.getByActivity(activityId));
    }
}
