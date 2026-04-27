package com.tfg.gestionong.controller;

import com.tfg.gestionong.model.Activity;
import com.tfg.gestionong.service.ActivityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/activities")
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(activityService.getAllActivities());
    }

    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activityToCreate) {
        Activity created = activityService.createActivity(activityToCreate);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable int id) {
        Activity activity = activityService.getActivityById(id);
        if (activity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(activity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@RequestBody Activity activityToUpdate, @PathVariable int id) {
        Activity updated = activityService.updateActivity(id, activityToUpdate);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable int id) {
        Activity activity = activityService.getActivityById(id);
        if (activity == null) {
            return ResponseEntity.notFound().build();
        }
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
