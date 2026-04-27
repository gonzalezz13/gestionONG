package com.tfg.gestionong.service;

import com.tfg.gestionong.model.UserActivity;
import com.tfg.gestionong.model.UserActivityId;
import com.tfg.gestionong.repository.UserActivityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserActivityServiceImpl implements UserActivityService {

    private final UserActivityRepository repository;

    @Override
    public UserActivity enroll(UserActivity userActivity) {
        return repository.save(userActivity);
    }

    @Override
    public UserActivity getById(UserActivityId id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public UserActivity updateStatus(UserActivityId id, UserActivity.Status status) {
        UserActivity existing = repository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setStatus(status);
        return repository.save(existing);
    }

    @Override
    public void unenroll(UserActivityId id) {
        repository.deleteById(id);
    }

    @Override
    public List<UserActivity> getByUser(int userId) {
        return repository.findByIdUserId(userId);
    }

    @Override
    public List<UserActivity> getByActivity(int activityId) {
        return repository.findByIdActivityId(activityId);
    }
}
