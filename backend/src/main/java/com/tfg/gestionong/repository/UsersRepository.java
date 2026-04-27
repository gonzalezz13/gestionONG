package com.tfg.gestionong.repository;

import com.tfg.gestionong.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);
}
