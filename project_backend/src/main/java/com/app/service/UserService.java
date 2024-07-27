package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.Repository.UserRepository;
import com.app.exception.DuplicateEmailException;
import com.app.models.User;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User saveUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateEmailException("Email already exists");
        }
        return userRepository.save(user);
    }
    

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public int updatePassword(String password, String email) {
        return userRepository.updatePassword(password, email);
    }
}
