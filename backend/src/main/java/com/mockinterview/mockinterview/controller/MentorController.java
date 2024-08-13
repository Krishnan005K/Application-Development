package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.Mentor;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.service.MentorService;
import com.mockinterview.mockinterview.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @Autowired
    private StudentService studentService;
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_INTERVIEWER')")
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> mentors = mentorService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Mentor> createMentor(@RequestBody Mentor mentor) {
        Mentor createdMentor = mentorService.addMentor(mentor);
        return ResponseEntity.ok(createdMentor);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteMentor(@PathVariable Long id) {
        mentorService.deleteMentor(id);
        return ResponseEntity.noContent().build();
    }


    

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_INTERVIEWER')")
    public ResponseEntity<List<Mentor>> getMentorsByEmail(@PathVariable String email) {
        List<Mentor> mentors = mentorService.getMentorsByEmail(email);
        return ResponseEntity.ok(mentors);
    }
    @GetMapping("/dept/{dept}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD')")
    public ResponseEntity<List<Mentor>> getMentorsByDept(@PathVariable String dept) {
        List<Mentor> mentors = mentorService.getMentorsByDept(dept);
        return ResponseEntity.ok(mentors);
    }
  
    @GetMapping("/dept/{dept}/class/{classBeingMentored}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_INTERVIEWER')")
    public ResponseEntity<List<Mentor>> getMentorsByDeptAndClassBeingMentored(@PathVariable String dept, @PathVariable String classBeingMentored) {
        List<Mentor> mentors = mentorService.getMentorsByDeptAndClassBeingMentored(dept, classBeingMentored);
        return ResponseEntity.ok(mentors);
    }

    @DeleteMapping("/email/{email}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteMentorByEmail(@PathVariable String email) {
        System.out.println("Deleting mentor with email: " + email);
        mentorService.deleteMentorByEmail(email);
        return ResponseEntity.noContent().build();
    }
}
