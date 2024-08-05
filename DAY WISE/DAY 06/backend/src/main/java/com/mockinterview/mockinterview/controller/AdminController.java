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
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.saveAdmin(admin));
    }

    // CRUD operations for Student
    @PostMapping("/students")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.ok(adminService.saveStudent(student));
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = adminService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/students/ratings/{ratings}")
    public List<Student> getStudentsByRatings(@PathVariable double ratings) {
        return adminService.getStudentsByRatings(ratings);
    }
    
    @GetMapping("/mentors/{dept}/{classBeingMentored}")
    public List<Mentor> getMentorsByDeptAndclassBeingMentored(@PathVariable String dept, @PathVariable String classBeingMentored) {
        return adminService.getMentorsByDeptAndclassBeingMentored(dept, classBeingMentored);
    }

    @GetMapping("/students/{dept}/name/{name}")
    public List<Student> getStudentsByDeptAndName(@PathVariable String dept, @PathVariable String name) {
        return adminService.getStudentsByDeptAndName(dept, name);
    }

    @GetMapping("/students/{dept}/email/{email}")
    public List<Student> getStudentsByDeptAndEmail(@PathVariable String dept, @PathVariable String email) {
        return adminService.getStudentsByDeptAndEmail(dept, email);
    }
    @DeleteMapping("/students/{dept}/{email}")
    public ResponseEntity<Void> deleteStudentByDeptAndEmail(@PathVariable String dept, @PathVariable String email) {
        adminService.deleteStudentByDeptAndEmail(dept, email);
        return ResponseEntity.noContent().build();
    }

    // CRUD operations for Mentor
    @PostMapping("/mentors")
    public ResponseEntity<Mentor> createMentor(@RequestBody Mentor mentor) {
        return ResponseEntity.ok(adminService.saveMentor(mentor));
    }

    @GetMapping("/mentors")
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> mentors = adminService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }

    @GetMapping("/mentors/email/{email}")
    public ResponseEntity<Mentor> getMentorByEmail(@PathVariable String email) {
        Mentor mentor = adminService.getMentorByEmail(email);
        return mentor != null ? ResponseEntity.ok(mentor) : ResponseEntity.notFound().build();
    }

    // @GetMapping("/mentors/{dept}/{section}")
    // public List<Mentor> getMentorsByDeptAndclassBeingMentored(@PathVariable String dept, @PathVariable String classBeingMentored) {
    //     return adminService.getMentorsByDeptAndclassBeingMentored(dept, classBeingMentored);
    // }

    // CRUD operations for Head
    @PostMapping("/heads")
    public ResponseEntity<Head> createHead(@RequestBody Head head) {
        return ResponseEntity.ok(adminService.saveHead(head));
    }

    @GetMapping("/heads")
    public ResponseEntity<List<Head>> getAllHeads() {
        List<Head> heads = adminService.getAllHeads();
        return ResponseEntity.ok(heads);
    }

    // CRUD operations for Interviewer
    @GetMapping("/interviewers")
    public ResponseEntity<List<Interviewer>> getAllInterviewers() {
        List<Interviewer> interviewers = adminService.getAllInterviewers();
        return ResponseEntity.ok(interviewers);
    }

    @GetMapping("/interviewers/email/{email}")
    public Interviewer getInterviewerByEmail(String email) {
        List<Interviewer> interviewers = interviewerRepository.findByEmail(email);
        if (interviewers.isEmpty()) {
            return null; // or throw an exception if preferred
        }
        return interviewers.get(0); // return the first interviewer in the list
    }
    // CRUD operations for Interview
    @PostMapping("/interviews")
    public ResponseEntity<Interview> createInterview(@RequestBody Interview interview) {
        return ResponseEntity.ok(adminService.saveInterview(interview));
    }

    @GetMapping("/interviews")
    public ResponseEntity<List<Interview>> getAllInterviews() {
        List<Interview> interviews = adminService.getAllInterviews();
        return ResponseEntity.ok(interviews);
    }
}
