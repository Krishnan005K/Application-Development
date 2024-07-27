package com.app.contoller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.models.Feedback;
import com.app.service.FeedbackService;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        return new ResponseEntity<>(feedbackService.saveFeedback(feedback), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        Optional<Feedback> feedback = feedbackService.findFeedbackById(id);
        return feedback.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/interview/{interviewId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByInterviewId(@PathVariable Long interviewId) {
        return ResponseEntity.ok(feedbackService.findByInterviewId(interviewId));
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByCandidateId(@PathVariable Long candidateId) {
        return ResponseEntity.ok(feedbackService.findByCandidateId(candidateId));
    }
}
