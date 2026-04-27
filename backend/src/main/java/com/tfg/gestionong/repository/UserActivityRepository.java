package com.tfg.gestionong.repository;

import com.tfg.gestionong.model.UserActivity;
import com.tfg.gestionong.model.UserActivityId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, UserActivityId> {

    List<UserActivity> findByIdUserId(Integer userId);

    List<UserActivity> findByIdActivityId(Integer activityId);
}
