package com.test.users.service;

import com.test.users.User;
import com.test.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addNewUser(User user) {
        User save;
        try {
            save = userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed operation: User could not be saved:", e);
        }
        return save;
    }

    @Override
    public User findUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();  // This already returns List<User>
    }

    @Override
    public User findByName(String name) {
        return userRepository.findByName(name);
    }
}