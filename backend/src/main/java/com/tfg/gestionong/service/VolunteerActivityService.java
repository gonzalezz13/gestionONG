package com.tfg.gestionong.service;

import com.tfg.gestionong.model.VolunteerActivity;
import com.tfg.gestionong.model.VolunteerActivityId;

import java.util.List;

public interface VolunteerActivityService {

    VolunteerActivity enroll(VolunteerActivity volunteerActivity);

    VolunteerActivity getById(VolunteerActivityId id);

    VolunteerActivity updateStatus(VolunteerActivityId id, VolunteerActivity.Status status);

    void unenroll(VolunteerActivityId id);

    List<VolunteerActivity> getByVolunteer(int volunteerId);

    List<VolunteerActivity> getByActivity(int activityId);
}
