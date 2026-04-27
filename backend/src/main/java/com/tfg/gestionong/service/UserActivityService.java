package com.tfg.gestionong.service;

import com.tfg.gestionong.model.UserActivity;
import com.tfg.gestionong.model.UserActivityId;

import java.util.List;

public interface UserActivityService {

    UserActivity enroll(UserActivity userActivity);

    UserActivity getById(UserActivityId id);

    UserActivity updateStatus(UserActivityId id, UserActivity.Status status);

    void unenroll(UserActivityId id);

    List<UserActivity> getByUser(int userId);

    List<UserActivity> getByActivity(int activityId);
}
