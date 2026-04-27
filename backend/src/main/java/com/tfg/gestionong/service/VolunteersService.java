package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Volunteer;
import org.springframework.stereotype.Service;

public interface VolunteersService {

    Volunteer createVolunteer(Volunteer volunteer);

    Volunteer getVolunteerById(int id);

    Volunteer updateVolunteer(int id, Volunteer volunteer);

    void deleteVolunteer(int id);
}