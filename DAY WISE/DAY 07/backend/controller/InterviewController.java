package com.mockinterview.backend.controller;

import com.mockinterview.backend.model.Interview;
import com.mockinterview.backend.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {
    @Autowired
    private InterviewService interviewService;

    @PostMapping
    public ResponseEntity<Interview> addInterview(@RequestBody Interview interview) {
        return ResponseEntity.ok(interviewService.addInterview(interview));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Interview> updateInterview(@PathVariable Long id, @RequestBody Interview interviewDetails) {
        Interview updatedInterview = interviewService.updateInterview(id, interviewDetails);
        if (updatedInterview != null) {
            return ResponseEntity.ok(updatedInterview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Interview>> getInterviewsByTitle(@PathVariable String title) {
        return ResponseEntity.ok(interviewService.getInterviewsByTitle(title));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Interview>> getInterviewsByType(@PathVariable String type) {
        return ResponseEntity.ok(interviewService.getInterviewsByType(type));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Interview>> getUpcomingInterviews() {
        return ResponseEntity.ok(interviewService.getUpcomingInterviews(LocalDate.now()));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Interview>> getInterviewsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(interviewService.getInterviewsByStudentId(studentId));
    }

    @GetMapping("/interviewer/{interviewerId}")
    public ResponseEntity<List<Interview>> getInterviewsByInterviewerId(@PathVariable Long interviewerId) {
        return ResponseEntity.ok(interviewService.getInterviewsByInterviewerId(interviewerId));
    }
}
