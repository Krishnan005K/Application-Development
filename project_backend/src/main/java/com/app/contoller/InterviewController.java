package com.app.contoller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.models.Interview;
import com.app.service.InterviewService;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping
    public ResponseEntity<Interview> createInterview(@RequestBody Interview interview) {
        return new ResponseEntity<>(interviewService.saveInterview(interview), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Long id) {
        Optional<Interview> interview = interviewService.findInterviewById(id);
        return interview.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<Interview>> getInterviewsByCandidateId(@PathVariable Long candidateId) {
        return ResponseEntity.ok(interviewService.findByCandidateId(candidateId));
    }

    @GetMapping("/interviewer/{interviewerId}")
    public ResponseEntity<List<Interview>> getInterviewsByInterviewerId(@PathVariable Long interviewerId) {
        return ResponseEntity.ok(interviewService.findByInterviewerId(interviewerId));
    }

    @PutMapping("/reschedule")
    public ResponseEntity<Void> rescheduleInterview(@RequestParam String scheduledDate, @RequestParam Long id) {
        int result = interviewService.rescheduleInterview(scheduledDate, id);
        return result > 0 ? new ResponseEntity<>(HttpStatus.OK)
                          : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
