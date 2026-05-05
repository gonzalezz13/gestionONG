package com.tfg.gestionong.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "noticias")
@Data
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String date;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String image;

    private String category;
}
