package com.app.contoller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.models.Interviewer;
import com.app.service.InterviewerService;

@RestController
@RequestMapping("/api/interviewers")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class InterviewerController {

    @Autowired
    private InterviewerService interviewerService;

    @PostMapping
    public ResponseEntity<Interviewer> createInterviewer(@RequestBody Interviewer interviewer) {
        return new ResponseEntity<>(interviewerService.saveInterviewer(interviewer), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interviewer> getInterviewerById(@PathVariable Long id) {
        Optional<Interviewer> interviewer = interviewerService.findInterviewerById(id);
        return interviewer.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterviewer(@PathVariable Long id) {
        interviewerService.deleteInterviewer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/login")
    public ResponseEntity<Interviewer> login(@RequestParam String email, @RequestParam String password) {
        Optional<Interviewer> interviewer = interviewerService.findByEmailAndPassword(email, password);
        return interviewer.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<Void> updatePassword(@RequestParam String password, @RequestParam String email) {
        int result = interviewerService.updatePassword(password, email);
        return result > 0 ? new ResponseEntity<>(HttpStatus.OK)
                          : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
