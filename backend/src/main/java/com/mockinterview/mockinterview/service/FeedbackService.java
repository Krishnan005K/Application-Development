package com.mockinterview.mockinterview.service;

import com.mockinterview.mockinterview.model.Feedback;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.repository.FeedbackRepository;
import com.mockinterview.mockinterview.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Add a new Feedback
    public Feedback addFeedback(Long studentId, Feedback feedback) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            feedback.setStudent(optionalStudent.get());
            return feedbackRepository.save(feedback);
        } else {
            throw new RuntimeException("Student not found");
        }
    }

    // Update an existing Feedback
    public Feedback updateFeedback(Long feedbackId, Feedback feedbackDetails) {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(feedbackId);
        if (optionalFeedback.isPresent()) {
            Feedback feedback = optionalFeedback.get();
            feedback.setFeedback(feedbackDetails.getFeedback());
            feedback.setAccuracy(feedbackDetails.getAccuracy());
            feedback.setRelevance(feedbackDetails.getRelevance());
            feedback.setEfficiency(feedbackDetails.getEfficiency());
            feedback.setRating(feedbackDetails.getRating());
            return feedbackRepository.save(feedback);
        } else {
            throw new RuntimeException("Feedback not found");
        }
    }

    // Delete a Feedback by ID
    public void deleteFeedback(Long feedbackId) {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(feedbackId);
        if (optionalFeedback.isPresent()) {
            feedbackRepository.delete(optionalFeedback.get());
        } else {
            throw new RuntimeException("Feedback not found");
        }
    }

    // Get all Feedbacks for a specific Student
    public List<Feedback> getFeedbacksByStudentId(Long studentId) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        if (optionalStudent.isPresent()) {
            return feedbackRepository.findByStudent(optionalStudent.get());
        } else {
            throw new RuntimeException("Student not found");
        }
    }

    // Get a Feedback by ID
    public Feedback getFeedbackById(Long feedbackId) {
        return feedbackRepository.findById(feedbackId).orElse(null);
    }

    // Get all Feedbacks
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
}
