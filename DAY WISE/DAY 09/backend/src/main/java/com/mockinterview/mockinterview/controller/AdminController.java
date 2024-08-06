package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.repository.*;
import com.mockinterview.mockinterview.model.Admin;
import com.mockinterview.mockinterview.model.Head;
import com.mockinterview.mockinterview.model.Interview;
import com.mockinterview.mockinterview.model.Interviewer;
import com.mockinterview.mockinterview.model.Mentor;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private InterviewerRepository interviewerRepository;

    // CRUD operations for Admin
    @PostMapping("/admins")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.saveAdmin(admin));
    }

    // CRUD operations for Student
    @PostMapping("/students")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.ok(adminService.saveStudent(student));
    }

    @GetMapping("/students")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MENTOR') or hasRole('ROLE_HEAD')")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = adminService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/students/ratings/{ratings}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MENTOR') or hasRole('ROLE_HEAD')")
    public List<Student> getStudentsByRatings(@PathVariable double ratings) {
        return adminService.getStudentsByRatings(ratings);
    }
    
    @GetMapping("/mentors/{dept}/{classBeingMentored}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_HEAD')")
    public List<Mentor> getMentorsByDeptAndclassBeingMentored(@PathVariable String dept, @PathVariable String classBeingMentored) {
        return adminService.getMentorsByDeptAndclassBeingMentored(dept, classBeingMentored);
    }

    @GetMapping("/students/{dept}/name/{name}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_HEAD')")
    public List<Student> getStudentsByDeptAndName(@PathVariable String dept, @PathVariable String name) {
        return adminService.getStudentsByDeptAndName(dept, name);
    }

    @GetMapping("/students/{dept}/email/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_HEAD')")
    public List<Student> getStudentsByDeptAndEmail(@PathVariable String dept, @PathVariable String email) {
        return adminService.getStudentsByDeptAndEmail(dept, email);
    }

    @DeleteMapping("/students/{dept}/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteStudentByDeptAndEmail(@PathVariable String dept, @PathVariable String email) {
        adminService.deleteStudentByDeptAndEmail(dept, email);
        return ResponseEntity.noContent().build();
    }

    // CRUD operations for Mentor
    @PostMapping("/mentors")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Mentor> createMentor(@RequestBody Mentor mentor) {
        return ResponseEntity.ok(adminService.saveMentor(mentor));
    }

    @GetMapping("/mentors")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_HEAD')")
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> mentors = adminService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }

    @GetMapping("/mentors/email/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_HEAD')")
    public ResponseEntity<Mentor> getMentorByEmail(@PathVariable String email) {
        Mentor mentor = adminService.getMentorByEmail(email);
        return mentor != null ? ResponseEntity.ok(mentor) : ResponseEntity.notFound().build();
    }

    // CRUD operations for Head
    @PostMapping("/heads")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Head> createHead(@RequestBody Head head) {
        return ResponseEntity.ok(adminService.saveHead(head));
    }

    @GetMapping("/heads")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Head>> getAllHeads() {
        List<Head> heads = adminService.getAllHeads();
        return ResponseEntity.ok(heads);
    }

    // CRUD operations for Interviewer
    @GetMapping("/interviewers")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_HEAD')")
    public ResponseEntity<List<Interviewer>> getAllInterviewers() {
        List<Interviewer> interviewers = adminService.getAllInterviewers();
        return ResponseEntity.ok(interviewers);
    }

    @GetMapping("/interviewers/email/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_HEAD')")
    public Interviewer getInterviewerByEmail(@PathVariable String email) {
        List<Interviewer> interviewers = interviewerRepository.findByEmail(email);
        if (interviewers.isEmpty()) {
            return null; // or throw an exception if preferred
        }
        return interviewers.get(0); // return the first interviewer in the list
    }

    // CRUD operations for Interview
    @PostMapping("/interviews")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Interview> createInterview(@RequestBody Interview interview) {
        return ResponseEntity.ok(adminService.saveInterview(interview));
    }

    @GetMapping("/interviews")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MENTOR') or hasRole('ROLE_HEAD')")
    public ResponseEntity<List<Interview>> getAllInterviews() {
        List<Interview> interviews = adminService.getAllInterviews();
        return ResponseEntity.ok(interviews);
    }
}
