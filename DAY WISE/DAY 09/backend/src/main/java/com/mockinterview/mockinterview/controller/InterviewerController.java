package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.*;
import com.mockinterview.mockinterview.service.InterviewerService;
import com.mockinterview.mockinterview.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/interviewers")
public class InterviewerController {
    @Autowired
    private InterviewerService interviewerService;

    @Autowired
    private StudentService studentService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Interviewer> addInterviewer(@RequestBody Interviewer interviewer) {
        Interviewer createdInterviewer = interviewerService.addInterviewer(interviewer);
        return ResponseEntity.ok(createdInterviewer);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Interviewer> updateInterviewer(@PathVariable Long id, @RequestBody Interviewer interviewerDetails) {
        Interviewer updatedInterviewer = interviewerService.updateInterviewer(id, interviewerDetails);
        return ResponseEntity.ok(updatedInterviewer);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteInterviewer(@PathVariable Long id) {
        interviewerService.deleteInterviewer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_INTERVIEWER', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Interviewer>> getAllInterviewers() {
        List<Interviewer> interviewers = interviewerService.getAllInterviewers();
        return ResponseEntity.ok(interviewers);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_INTERVIEWER', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<Optional<Interviewer>> getInterviewerById(@PathVariable Long id) {
        Optional<Interviewer> interviewer = interviewerService.getInterviewerById(id);
        return ResponseEntity.ok(interviewer);
    }

    @PostMapping("/{interviewerId}/interviews")
    @PreAuthorize("hasAuthority('ROLE_INTERVIEWER')")
    public ResponseEntity<Interview> createInterview(@PathVariable Long interviewerId, @RequestBody Interview interview) {
        Interview createdInterview = interviewerService.createInterview(interviewerId, interview);
        return ResponseEntity.ok(createdInterview);
    }

    @PostMapping("/{interviewerId}/feedbacks")
    @PreAuthorize("hasAuthority('ROLE_INTERVIEWER')")
    public ResponseEntity<Feedback> addFeedback(@PathVariable Long interviewerId, @RequestBody Feedback feedback) {
        Feedback createdFeedback = interviewerService.addFeedback(interviewerId, feedback);
        return ResponseEntity.ok(createdFeedback);
    }

    @GetMapping("/students")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = interviewerService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/dept/{dept}/section/{section}")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Student>> getStudentsByDeptAndSection(@PathVariable String dept, @PathVariable String section) {
        List<Student> students = studentService.getStudentsByDeptAndSection(dept, section);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/students/dept/{dept}")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Student>> getStudentsByDept(@PathVariable String dept) {
        List<Student> students = interviewerService.getStudentsByDept(dept);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/mentors")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> mentors = interviewerService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }
}
