package com.tfg.gestionong.dto;

import com.tfg.gestionong.model.Activity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityDTO {
    private Integer id;
    private String title;
    private String description;
    private String location;
    private String imageUrl;
    private String difficulty;
    private LocalDateTime activityDate;
    private Integer maxParticipants;
    private Integer currentParticipants;
    private Integer availablePlaces;
    private String category;
    private String status;

    public static ActivityDTO from(Activity activity, int currentParticipants) {
        ActivityDTO dto = new ActivityDTO();
        dto.setId(activity.getId());
        dto.setTitle(activity.getTitle());
        dto.setDescription(activity.getDescription());
        dto.setLocation(activity.getLocation());
        dto.setImageUrl(activity.getImageUrl());
        dto.setDifficulty(activity.getDifficulty());
        dto.setActivityDate(activity.getActivityDate());
        dto.setMaxParticipants(activity.getMaxParticipants());
        dto.setCurrentParticipants(currentParticipants);
        dto.setAvailablePlaces(Math.max(0, activity.getMaxParticipants() - currentParticipants));
        dto.setCategory(activity.getCategory() != null ? activity.getCategory().name() : null);
        dto.setStatus(activity.getStatus() != null ? activity.getStatus().getDbValue() : null);
        return dto;
    }
}
