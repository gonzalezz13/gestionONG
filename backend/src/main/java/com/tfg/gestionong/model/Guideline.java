package com.tfg.gestionong.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "guidelines")
@Data
public class Guideline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;

    private String size;

    private String date;

    @Column(name = "icon_color")
    @JsonProperty("iconColor")
    private String iconColor;

    @Column(name = "download_url")
    @JsonProperty("downloadUrl")
    private String downloadUrl;
}
