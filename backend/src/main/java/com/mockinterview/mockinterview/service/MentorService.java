package com.mockinterview.mockinterview.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mockinterview.mockinterview.model.Mentor;
import com.mockinterview.mockinterview.repository.MentorRepository;

@Service
public class MentorService {

    @Autowired
    private MentorRepository mentorRepository;

     @Autowired
    private PasswordEncoder passwordEncoder;
    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    public Mentor addMentor(Mentor mentor) {
        mentor.setPassword(passwordEncoder.encode(mentor.getPassword()));
        return mentorRepository.save(mentor);
    }

    public void deleteMentor(Long id) {
        mentorRepository.deleteById(id);
    }

    public List<Mentor> getMentorsByEmail(String email) {
        return mentorRepository.findByEmail(email);
    }

    public List<Mentor> getMentorsByDept(String dept) {
        return mentorRepository.findByDept(dept);
    }

    public List<Mentor> getMentorsByClassBeingMentored(String classBeingMentored) {
        return mentorRepository.findByClassBeingMentored(classBeingMentored);
    }

    public List<Mentor> getMentorsByDeptAndClassBeingMentored(String dept, String classBeingMentored) {
        return mentorRepository.findByDeptAndClassBeingMentored(dept, classBeingMentored);
    }
    
    public void deleteMentorByEmail(String email) {
        try {
            System.out.println("Service: Deleting mentor with email: " + email);
            mentorRepository.deleteByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
            // Add appropriate error handling here
        }
    }
}
