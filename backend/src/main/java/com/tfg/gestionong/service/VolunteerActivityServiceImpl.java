package com.tfg.gestionong.service;

import com.tfg.gestionong.model.VolunteerActivity;
import com.tfg.gestionong.model.VolunteerActivityId;
import com.tfg.gestionong.repository.VolunteerActivityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerActivityServiceImpl implements VolunteerActivityService {

    private final VolunteerActivityRepository repository;

    @Override
    public VolunteerActivity enroll(VolunteerActivity volunteerActivity) {
        return repository.save(volunteerActivity);
    }

    @Override
    public VolunteerActivity getById(VolunteerActivityId id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public VolunteerActivity updateStatus(VolunteerActivityId id, VolunteerActivity.Status status) {
        VolunteerActivity existing = repository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setStatus(status);
        return repository.save(existing);
    }

    @Override
    public void unenroll(VolunteerActivityId id) {
        repository.deleteById(id);
    }

    @Override
    public List<VolunteerActivity> getByVolunteer(int volunteerId) {
        return repository.findByIdVolunteerId(volunteerId);
    }

    @Override
    public List<VolunteerActivity> getByActivity(int activityId) {
        return repository.findByIdActivityId(activityId);
    }
}
