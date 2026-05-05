package com.tfg.gestionong.repository;

import com.tfg.gestionong.model.Guideline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuidelineRepository extends JpaRepository<Guideline, Long> {
}
