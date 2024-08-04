package com.mockinterview.backend.service;

import com.mockinterview.backend.model.Mentor;
import com.mockinterview.backend.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MentorService {


    @Autowired
    private MentorRepository mentorRepository;

    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    public Mentor getMentorById(Long id) {
        return mentorRepository.findById(id).orElse(null);
    }

    public Mentor addMentor(Mentor mentor) {
        return mentorRepository.save(mentor);
    }

    public Mentor updateMentor(Long id, Mentor mentorDetails) {
        Optional<Mentor> mentorOptional = mentorRepository.findById(id);
        if (mentorOptional.isPresent()) {
            Mentor mentor = mentorOptional.get();
            mentor.setName(mentorDetails.getName());
            mentor.setEmail(mentorDetails.getEmail());
            mentor.setDept(mentorDetails.getDept());
            mentor.setClassBeingMentored(mentorDetails.getClassBeingMentored());
            mentor.setHead(mentorDetails.getHead());
            return mentorRepository.save(mentor);
        }
        return null;
    }

    public void deleteMentor(Long id) {
        mentorRepository.deleteById(id);
    }

    public List<Mentor> getMentorsByDepartment(String department) {
        return mentorRepository.findByHeadDepartment(department);
    }

    public List<Mentor> getMentorsByEmail(String email) {
        return mentorRepository.findByEmail(email);
    }

    public List<Mentor> getMentorsByClass(String classBeingMentored) {
        return mentorRepository.findByClassBeingMentored(classBeingMentored);
    }
}
