package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Activity;
import com.tfg.gestionong.repository.ActivityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository repository;

    @Override
    public List<Activity> getAllActivities() {
        return repository.findAll();
    }

    @Override
    public Activity createActivity(Activity activity) {
        return repository.save(activity);
    }

    @Override
    public Activity getActivityById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Activity updateActivity(int id, Activity activity) {
        if (!repository.existsById(id)) {
            return null;
        }
        activity.setId(id);
        return repository.save(activity);
    }

    @Override
    public void deleteActivity(int id) {
        repository.deleteById(id);
    }
}
