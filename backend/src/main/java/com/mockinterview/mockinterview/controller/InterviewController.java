package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.Interview;
import com.mockinterview.mockinterview.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {
    @Autowired
    private InterviewService interviewService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER')")
    public ResponseEntity<Interview> addInterview(@RequestBody Interview interview) {
        return ResponseEntity.ok(interviewService.addInterview(interview));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/title/{title}")
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Interview>> getInterviewsByTitle(@PathVariable String title) {
        return ResponseEntity.ok(interviewService.getInterviewsByTitle(title));
    }

    @GetMapping("/roundname/{roundname}")
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Interview>> getInterviewsByRoundName(@PathVariable String roundname) {
        return ResponseEntity.ok(interviewService.getInterviewsByRoundName(roundname));
    }

    @GetMapping("/upcoming")
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Interview>> getUpcomingInterviews() {
        return ResponseEntity.ok(interviewService.getUpcomingInterviews(LocalDate.now()));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Interview>> getInterviewsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(interviewService.getInterviewsByStudentId(studentId));
    }

    @GetMapping("/interviewer/{interviewerId}")
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Interview>> getInterviewsByInterviewerId(@PathVariable Long interviewerId) {
        return ResponseEntity.ok(interviewService.getInterviewsByInterviewerId(interviewerId));
    }

    // New endpoints
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Interview>> getAllInterviews() {
        return ResponseEntity.ok(interviewService.getAllInterviews());
    }



    @PutMapping("/scheduled-date/{date}")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<Interview> updateInterviewByDate(@PathVariable String date, @RequestBody Interview interviewDetails) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        Interview updatedInterview = interviewService.updateInterviewByDate(localDate, interviewDetails);
        if (updatedInterview != null) {
            return ResponseEntity.ok(updatedInterview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/roundname/{roundname}")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<Interview> updateInterviewByRoundName(@PathVariable String roundname, @RequestBody Interview interviewDetails) {
        Interview updatedInterview = interviewService.updateInterviewByRoundName(roundname, interviewDetails);
        if (updatedInterview != null) {
            return ResponseEntity.ok(updatedInterview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/roundname/{roundname}")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<Void> deleteInterviewsByRoundName(@PathVariable String roundname) {
        interviewService.deleteInterviewsByRoundName(roundname);
        return ResponseEntity.noContent().build();
    }


}
