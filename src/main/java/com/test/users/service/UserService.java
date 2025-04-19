package com.test.users.service;

import com.test.users.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

     User addNewUser(User user);

     User findUser(Long id);

     List<User> getUsers();

     User findByName(String name);
}
