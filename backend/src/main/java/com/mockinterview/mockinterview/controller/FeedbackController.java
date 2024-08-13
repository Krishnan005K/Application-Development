package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.Feedback;
import com.mockinterview.mockinterview.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Add a new Feedback
    @PostMapping("/students/{studentId}")
    public ResponseEntity<Feedback> addFeedback(@PathVariable Long studentId, @RequestBody Feedback feedback) {
        Feedback newFeedback = feedbackService.addFeedback(studentId, feedback);
        return ResponseEntity.ok(newFeedback);
    }

    // Update an existing Feedback
    @PutMapping("/{feedbackId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long feedbackId, @RequestBody Feedback feedbackDetails) {
        Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedbackDetails);
        return ResponseEntity.ok(updatedFeedback);
    }

    // Delete a Feedback by ID
    @DeleteMapping("/{feedbackId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }

    // Get all Feedbacks for a specific Student
    @GetMapping("/students/{studentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_MENTOR', 'ROLE_STUDENT')")
    public ResponseEntity<List<Feedback>> getFeedbacksByStudentId(@PathVariable Long studentId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByStudentId(studentId);
        return ResponseEntity.ok(feedbacks);
    }

    // Get a Feedback by ID
    @GetMapping("/{feedbackId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_MENTOR', 'ROLE_STUDENT')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        Feedback feedback = feedbackService.getFeedbackById(feedbackId);
        return ResponseEntity.ok(feedback);
    }

    // Get all Feedbacks
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_MENTOR', 'ROLE_STUDENT')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbacks);
    }
}