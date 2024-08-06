package com.mockinterview.mockinterview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mockinterview.mockinterview.model.Feedback;
import com.mockinterview.mockinterview.model.Interview;
import com.mockinterview.mockinterview.model.Interviewer;
import com.mockinterview.mockinterview.model.Mentor;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.repository.FeedbackRepository;
import com.mockinterview.mockinterview.repository.InterviewRepository;
import com.mockinterview.mockinterview.repository.InterviewerRepository;
import com.mockinterview.mockinterview.repository.MentorRepository;
import com.mockinterview.mockinterview.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class InterviewerService {
    @Autowired
    private InterviewerRepository interviewerRepository;

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private MentorRepository mentorRepository;
    
    @Autowired
    private StudentRepository studentRepository;

     @Autowired
    private PasswordEncoder passwordEncoder;

    public Interviewer addInterviewer(Interviewer interviewer) {
        
        interviewer.setPassword(passwordEncoder.encode(interviewer.getPassword()));
        return interviewerRepository.save(interviewer);
    }
    
   public Interviewer updateInterviewer(Long id, Interviewer interviewerDetails) {
    Optional<Interviewer> optionalInterviewer = interviewerRepository.findById(id);
    if (optionalInterviewer.isPresent()) {
        Interviewer existingInterviewer = optionalInterviewer.get();

        // Update fields, handling null values
        if (interviewerDetails.getName() != null) {
            existingInterviewer.setName(interviewerDetails.getName());
        }
        if (interviewerDetails.getEmail() != null) {
            existingInterviewer.setEmail(interviewerDetails.getEmail());
        }
        if (interviewerDetails.getPhoto() != null) {
            existingInterviewer.setPhoto(interviewerDetails.getPhoto());
        }
        if (interviewerDetails.getPassword() != null) {
            existingInterviewer.setPassword(interviewerDetails.getPassword());
        }
        // Add any additional fields if necessary

        // Save the updated interviewer
        return interviewerRepository.save(existingInterviewer);
    } else {
        throw new EntityNotFoundException("Interviewer with id " + id + " not found");
    }
}


    public void deleteInterviewer(Long id) {
        interviewerRepository.deleteById(id);
    }

    public List<Interviewer> getAllInterviewers() {
        return interviewerRepository.findAll();
    }

    public Optional<Interviewer> getInterviewerById(Long id) {
        return interviewerRepository.findById(id);
    }

    public List<Interviewer> getInterviewersByName(String name) {
        return interviewerRepository.findByName(name);
    }

    public List<Interviewer> getInterviewersByEmail(String email) {
        return interviewerRepository.findByEmail(email);
    }

    public Interview createInterview(Long interviewerId, Interview interview) {
        Optional<Interviewer> optionalInterviewer = interviewerRepository.findById(interviewerId);
        if (optionalInterviewer.isPresent()) {
            interview.setInterviewer(optionalInterviewer.get());
            return interviewRepository.save(interview);
        } else {
            return null;
        }
    }

    public Feedback addFeedback(Long interviewerId, Feedback feedback) {
        Optional<Interviewer> optionalInterviewer = interviewerRepository.findById(interviewerId);
        if (optionalInterviewer.isPresent()) {
            feedback.setInterviewer(optionalInterviewer.get());
            return feedbackRepository.save(feedback);
        } else {
            return null;
        }
    }

    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }
}
