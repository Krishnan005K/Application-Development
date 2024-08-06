package com.mockinterview.mockinterview.service;

import com.mockinterview.mockinterview.model.User;
import java.util.List;

public interface UserService {
    User createUser(User user);
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
    User getUserById(Long id);
    List<User> getAllUsers();
}
