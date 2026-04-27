package com.tfg.gestionong.service;

import com.tfg.gestionong.model.User;

import java.util.List;

public interface UsersService {

    List<User> getAllUsers();

    User createUser(User user);

    User getUserById(int id);

    User updateUser(int id, User user);

    void deleteUser(int id);
}
