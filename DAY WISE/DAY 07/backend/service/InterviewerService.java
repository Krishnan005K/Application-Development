package com.mockinterview.backend.service;

import com.mockinterview.backend.model.*;
import com.mockinterview.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Interviewer addInterviewer(Interviewer interviewer) {
        return interviewerRepository.save(interviewer);
    }
    

    public Interviewer updateInterviewer(Long id, Interviewer interviewerDetails) {
        Optional<Interviewer> optionalInterviewer = interviewerRepository.findById(id);
        if (optionalInterviewer.isPresent()) {
            Interviewer interviewer = optionalInterviewer.get();
            interviewer.setName(interviewerDetails.getName());
            interviewer.setEmail(interviewerDetails.getEmail());
            interviewer.setPhoto(interviewerDetails.getPhoto());
            return interviewerRepository.save(interviewer);
        } else {
            return null; // Handle interviewer not found case
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

    public Interview createInterview(Long interviewerId, Interview interview) {
        Optional<Interviewer> optionalInterviewer = interviewerRepository.findById(interviewerId);
        if (optionalInterviewer.isPresent()) {
            interview.setInterviewer(optionalInterviewer.get());
            return interviewRepository.save(interview);
        } else {
            return null; // Handle interviewer not found case
        }
    }

    public Feedback addFeedback(Long interviewerId, Feedback feedback) {
        Optional<Interviewer> optionalInterviewer = interviewerRepository.findById(interviewerId);
        if (optionalInterviewer.isPresent()) {
            feedback.setInterviewer(optionalInterviewer.get());
            return feedbackRepository.save(feedback);
        } else {
            return null; // Handle interviewer not found case
        }
    }

    public List<Student> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch);
    }

    public List<Student> getStudentsByBatchAndDept(String batch, String dept) {
        return studentRepository.findByBatchAndDept(batch, dept);
    }

    public List<Student> getStudentsByClass(String className) {
        return studentRepository.findAll().stream()
                .filter(student -> student.getSection().equalsIgnoreCase(className))
                .collect(Collectors.toList());
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Mentor> getAllMentors() {
        // Add Mentor repository and implement accordingly
        return mentorRepository.findAll();
    }
}
