package com.tfg.gestionong.repository;

import com.tfg.gestionong.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteersRepository extends JpaRepository<Volunteer, Integer> {

    Volunteer findByEmail(String email);
}