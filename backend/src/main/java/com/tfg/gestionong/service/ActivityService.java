package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Activity;

import java.util.List;

public interface ActivityService {

    List<Activity> getAllActivities();

    Activity createActivity(Activity activity);

    Activity getActivityById(int id);

    Activity updateActivity(int id, Activity activity);

    void deleteActivity(int id);
}
