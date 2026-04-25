package com.tfg.gestionong.service;

import com.tfg.gestionong.model.Activity;

public interface ActivityService {

    Activity createActivity(Activity activity);

    Activity getActivityById(int id);

    Activity updateActivity(int id, Activity activity);

    void deleteActivity(int id);
}
