package com.tfg.gestionong.repository;

import com.tfg.gestionong.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    List<Activity> findByStatus(Activity.Status status);
}
