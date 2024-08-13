package com.mockinterview.mockinterview.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mockinterview.mockinterview.model.*;
import com.mockinterview.mockinterview.repository.*;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private InterviewerRepository interviewerRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private HeadRepository headRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public User createUser(User user) {
        // Save user based on role
        if (user.getRoles().contains("ROLE_STUDENT")) {
            Student student = new Student();
            // Copy common attributes from User to Student
            student.setName(user.getName());
            student.setEmail(user.getEmail());
            student.setPassword(passwordEncoder.encode(user.getPassword()));
            student.setRoles(user.getRoles());
            // Set additional attributes for Student
            student.setDept(user instanceof Student ? ((Student) user).getDept() : null);
            // Save Student
            return studentRepository.save(student);
        } else if (user.getRoles().contains("ROLE_INTERVIEWER")) {
            Interviewer interviewer = new Interviewer();
            // Copy common attributes from User to Interviewer
            interviewer.setName(user.getName());
            interviewer.setEmail(user.getEmail());
            interviewer.setPassword(passwordEncoder.encode(user.getPassword()));
            interviewer.setRoles(user.getRoles());
            // Save Interviewer
            return interviewerRepository.save(interviewer);
        } else if (user.getRoles().contains("ROLE_MENTOR")) {
            Mentor mentor = new Mentor();
            // Copy common attributes from User to Mentor
            mentor.setName(user.getName());
            mentor.setEmail(user.getEmail());
            mentor.setPassword(passwordEncoder.encode(user.getPassword()));
            mentor.setRoles(user.getRoles());
            // Set additional attributes for Mentor
            mentor.setDept(user instanceof Mentor ? ((Mentor) user).getDept() : null);
            // Save Mentor
            return mentorRepository.save(mentor);
        } else if (user.getRoles().contains("ROLE_HEAD")) {
            Head head = new Head();
            // Copy common attributes from User to Head
            head.setName(user.getName());
            head.setEmail(user.getEmail());
            head.setPassword(passwordEncoder.encode(user.getPassword()));
            head.setRoles(user.getRoles());
            // Set additional attributes for Head
            head.setDept(user instanceof Head ? ((Head) user).getDept() : null);
            // Save Head
            return headRepository.save(head);
        } else {
            // Default to saving as User if no specific role
            return userRepository.save(user);
        }
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            // Update common attributes
            existingUser.setName(userDetails.getName());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            existingUser.setRoles(userDetails.getRoles());
            
            // Handle specific roles if needed (similar to saveUser)
            if (userDetails.getRoles().contains("ROLE_STUDENT") && existingUser instanceof Student) {
                ((Student) existingUser).setDept(userDetails instanceof Student ? ((Student) userDetails).getDept() : null);
                return studentRepository.save((Student) existingUser);
            } else if (userDetails.getRoles().contains("ROLE_INTERVIEWER") && existingUser instanceof Interviewer) {
                return interviewerRepository.save((Interviewer) existingUser);
            } else if (userDetails.getRoles().contains("ROLE_MENTOR") && existingUser instanceof Mentor) {
                ((Mentor) existingUser).setDept(userDetails instanceof Mentor ? ((Mentor) userDetails).getDept() : null);
                return mentorRepository.save((Mentor) existingUser);
            } else if (userDetails.getRoles().contains("ROLE_HEAD") && existingUser instanceof Head) {
                ((Head) existingUser).setDept(userDetails instanceof Head ? ((Head) userDetails).getDept() : null);
                return headRepository.save((Head) existingUser);
            } else {
                return userRepository.save(existingUser);
            }
        } else {
            return null; // User not found
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
