// InterviewCompletionController.java
package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.InterviewCompletion;
import com.mockinterview.mockinterview.service.InterviewCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview-completions")
public class InterviewCompletionController {

    @Autowired
    private InterviewCompletionService interviewCompletionService;

    @PostMapping
    public ResponseEntity<InterviewCompletion> addInterviewCompletion(@RequestBody InterviewCompletion interviewCompletion) {
        InterviewCompletion createdCompletion = interviewCompletionService.addInterviewCompletion(interviewCompletion);
        return ResponseEntity.ok(createdCompletion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewCompletion> updateInterviewCompletion(@PathVariable Long id, @RequestBody InterviewCompletion interviewCompletionDetails) {
        InterviewCompletion updatedCompletion = interviewCompletionService.updateInterviewCompletion(id, interviewCompletionDetails);
        if (updatedCompletion != null) {
            return ResponseEntity.ok(updatedCompletion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterviewCompletion(@PathVariable Long id) {
        interviewCompletionService.deleteInterviewCompletion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<InterviewCompletion>> getAllInterviewCompletions() {
        List<InterviewCompletion> completions = interviewCompletionService.getAllInterviewCompletions();
        return ResponseEntity.ok(completions);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<InterviewCompletion>> getInterviewCompletionsByStudentId(@PathVariable Long studentId) {
        List<InterviewCompletion> completions = interviewCompletionService.getInterviewCompletionsByStudentId(studentId);
        return ResponseEntity.ok(completions);
    }

    @GetMapping("/interview/{interviewId}")
    public ResponseEntity<List<InterviewCompletion>> getInterviewCompletionsByInterviewId(@PathVariable Long interviewId) {
        List<InterviewCompletion> completions = interviewCompletionService.getInterviewCompletionsByInterviewId(interviewId);
        return ResponseEntity.ok(completions);
    }
}
