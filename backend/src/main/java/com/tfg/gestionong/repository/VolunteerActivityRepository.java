package com.tfg.gestionong.repository;

import com.tfg.gestionong.model.VolunteerActivity;
import com.tfg.gestionong.model.VolunteerActivityId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VolunteerActivityRepository extends JpaRepository<VolunteerActivity, VolunteerActivityId> {

    List<VolunteerActivity> findByIdVolunteerId(Integer volunteerId);

    List<VolunteerActivity> findByIdActivityId(Integer activityId);
}
