package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.Head;
import com.mockinterview.mockinterview.model.Mentor;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.service.HeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/heads")
public class HeadController {

    @Autowired
    private HeadService headService;

    // Mentor endpoints
    @PostMapping("/mentors")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Mentor> addMentor(@RequestBody Mentor mentor) {
        Mentor createdMentor = headService.addMentor(mentor);
        return ResponseEntity.ok(createdMentor);
    }

    @GetMapping("/mentors/email/{email}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Mentor> getMentorByEmail(@PathVariable String email) {
        Mentor mentor = headService.getMentorByEmail(email);
        return mentor != null ? ResponseEntity.ok(mentor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/mentors/class/{classBeingMentored}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<List<Mentor>> getMentorsByClassBeingMentored(@PathVariable String classBeingMentored) {
        List<Mentor> mentors = headService.getMentorsByClassBeingMentored(classBeingMentored);
        return ResponseEntity.ok(mentors);
    }

    @GetMapping("/mentors/all")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> mentors = headService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }

    // Student endpoints
    @PostMapping("/students")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student createdStudent = headService.addStudent(student);
        return ResponseEntity.ok(createdStudent);
    }

    @DeleteMapping("/students/{id}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Void> deleteStudentById(@PathVariable Long id) {
        headService.deleteStudentById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/students/{id}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = headService.getStudentById(id);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    @GetMapping("/students/all")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = headService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/students/email/{email}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Student student = headService.getStudentByEmail(email);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    @GetMapping("/students/department/{dept}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<List<Student>> getStudentsByDept(@PathVariable String dept) {
        List<Student> students = headService.getStudentsByDept(dept);
        return ResponseEntity.ok(students);
    }
    @GetMapping("/ratings/students/dept/{dept}/section/{section}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Double> getOverallRatingByDepartmentAndSection(
            @PathVariable String dept,
            @PathVariable String section) {
        double rating = headService.getOverallRatingByDepartmentAndSection(dept, section);
        return ResponseEntity.ok(rating);
    }
    @GetMapping("/ratings/class/{classBeingMentored}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Double> getOverallRatingByClass(@PathVariable String classBeingMentored) {
        double rating = headService.getOverallRatingByClass(classBeingMentored);
        return ResponseEntity.ok(rating);
    }
    @GetMapping("/ratings/department/{dept}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Double> getOverallRatingByDept(@PathVariable String dept) {
        double rating = headService.getOverallRatingByDept(dept);
        return ResponseEntity.ok(rating);
    }
            
    @GetMapping("/id/{id}")
    @PreAuthorize("hasAuthority('ROLE_HEAD')")
    public ResponseEntity<Head> getHeadById(@PathVariable Long id) {
        Head head = headService.getHeadById(id);
        return head != null ? ResponseEntity.ok(head) : ResponseEntity.notFound().build();
    }
}
