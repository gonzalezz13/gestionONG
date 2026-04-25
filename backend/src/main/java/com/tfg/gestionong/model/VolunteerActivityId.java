package com.tfg.gestionong.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerActivityId implements Serializable {

    private Integer volunteerId;
    private Integer activityId;
}
