package com.tfg.gestionong.service;

import com.tfg.gestionong.model.User;
import com.tfg.gestionong.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UsersServiceImpl implements UsersService {

    private final UsersRepository repository;

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User createUser(User user) {
        return repository.save(user);
    }

    @Override
    public User getUserById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public User updateUser(int id, User user) {
        if (!repository.existsById(id)) {
            return null;
        }
        user.setId(id);
        return repository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        repository.deleteById(id);
    }
}
