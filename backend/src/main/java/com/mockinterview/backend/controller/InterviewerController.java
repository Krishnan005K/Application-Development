package com.mockinterview.backend.controller;

import com.mockinterview.backend.model.*;
import com.mockinterview.backend.service.InterviewerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/interviewers")
public class InterviewerController {
    @Autowired
    private InterviewerService interviewerService;

    @PostMapping
    public Interviewer addInterviewer(@RequestBody Interviewer interviewer) {
        return interviewerService.addInterviewer(interviewer);
    }

    @PutMapping("/{id}")
    public Interviewer updateInterviewer(@PathVariable Long id, @RequestBody Interviewer interviewerDetails) {
        return interviewerService.updateInterviewer(id, interviewerDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteInterviewer(@PathVariable Long id) {
        interviewerService.deleteInterviewer(id);
    }

    @GetMapping
    public List<Interviewer> getAllInterviewers() {
        return interviewerService.getAllInterviewers();
    }

    @GetMapping("/{id}")
    public Optional<Interviewer> getInterviewerById(@PathVariable Long id) {
        return interviewerService.getInterviewerById(id);
    }

    @PostMapping("/{interviewerId}/interviews")
    public Interview createInterview(@PathVariable Long interviewerId, @RequestBody Interview interview) {
        return interviewerService.createInterview(interviewerId, interview);
    }

    @PostMapping("/{interviewerId}/feedbacks")
    public Feedback addFeedback(@PathVariable Long interviewerId, @RequestBody Feedback feedback) {
        return interviewerService.addFeedback(interviewerId, feedback);
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return interviewerService.getAllStudents();
    }

    @GetMapping("/students/batch/{batch}")
    public List<Student> getStudentsByBatch(@PathVariable String batch) {
        return interviewerService.getStudentsByBatch(batch);
    }

    @GetMapping("/students/batch/{batch}/dept/{dept}")
    public List<Student> getStudentsByBatchAndDept(@PathVariable String batch, @PathVariable String dept) {
        return interviewerService.getStudentsByBatchAndDept(batch, dept);
    }

    @GetMapping("/students/class/{className}")
    public List<Student> getStudentsByClass(@PathVariable String className) {
        return interviewerService.getStudentsByClass(className);
    }

    @GetMapping("/mentors")
    public List<Mentor> getAllMentors() {
        return interviewerService.getAllMentors();
    }
}
