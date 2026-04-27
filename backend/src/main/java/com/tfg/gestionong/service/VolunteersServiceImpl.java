package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Volunteer;
import com.tfg.gestionong.repository.VolunteersRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class VolunteersServiceImpl implements VolunteersService {

    private final VolunteersRepository repository;

    @Override
    public Volunteer createVolunteer(Volunteer volunteer) {
        return repository.save(volunteer);
    }

    @Override
    public Volunteer getVolunteerById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Volunteer updateVolunteer(int id, Volunteer volunteer) {
        if (!repository.existsById(id)) {
            return null;
        }
        volunteer.setId(id);
        return repository.save(volunteer);
    }

    @Override
    public void deleteVolunteer(int id) {
        repository.deleteById(id);
    }
}