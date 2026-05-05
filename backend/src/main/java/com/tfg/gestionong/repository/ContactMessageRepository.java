package com.tfg.gestionong.repository;

import com.tfg.gestionong.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    java.util.List<ContactMessage> findByEmail(String email);
}
