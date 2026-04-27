package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Activity;

public interface ActivityService {

    Activity createActivity(Activity activity);

    Activity getActivityById(int id);

    java.util.List<Activity> getAllActivities();

    Activity updateActivity(int id, Activity activity);

    void deleteActivity(int id);
}
