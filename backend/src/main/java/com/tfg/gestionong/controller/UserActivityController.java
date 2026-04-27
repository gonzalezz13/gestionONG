package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.UserActivity;
import com.tfg.gestionong.model.UserActivityId;
import com.tfg.gestionong.service.UserActivityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/enrollments")
public class UserActivityController {

    private final UserActivityService userActivityService;

    @PostMapping
    public ResponseEntity<UserActivity> enroll(@RequestBody UserActivity userActivity) {
        UserActivity created = userActivityService.enroll(userActivity);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{userId}/{activityId}")
    public ResponseEntity<UserActivity> getEnrollment(@PathVariable int userId, @PathVariable int activityId) {
        UserActivity enrollment = userActivityService.getById(new UserActivityId(userId, activityId));
        if (enrollment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enrollment);
    }

    @PutMapping("/{userId}/{activityId}")
    public ResponseEntity<UserActivity> updateStatus(
            @PathVariable int userId,
            @PathVariable int activityId,
            @RequestParam UserActivity.Status status) {
        UserActivity updated = userActivityService.updateStatus(
                new UserActivityId(userId, activityId), status);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{userId}/{activityId}")
    public ResponseEntity<Void> unenroll(@PathVariable int userId, @PathVariable int activityId) {
        UserActivityId id = new UserActivityId(userId, activityId);
        if (userActivityService.getById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        userActivityService.unenroll(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserActivity>> getByUser(@PathVariable int userId) {
        return ResponseEntity.ok(userActivityService.getByUser(userId));
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<UserActivity>> getByActivity(@PathVariable int activityId) {
        return ResponseEntity.ok(userActivityService.getByActivity(activityId));
    }
}
