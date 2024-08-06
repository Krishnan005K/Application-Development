package com.mockinterview.mockinterview.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD','string')")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Student createStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/updateByRegisterNo/{registerNo}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Student updateStudentByRegisterNo(@PathVariable String registerNo, @RequestBody Student studentDetails) {
        return studentService.updateStudentByRegisterNo(registerNo, studentDetails);
    }

    @PutMapping("/updateByEmail/{email}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Student updateStudentByEmail(@PathVariable String email, @RequestBody Student studentDetails) {
        return studentService.updateStudentByEmail(email, studentDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByEmail(@PathVariable String email) {
        return studentService.getStudentsByEmail(email);
    }

    @GetMapping("/dept/{dept}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByDept(@PathVariable String dept) {
        return studentService.getStudentsByDept(dept);
    }

    @GetMapping("/ratings/{ratings}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByRatings(@PathVariable double ratings) {
        return studentService.getStudentsByRatings(ratings);
    }

    @GetMapping("/batch/{batch}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByBatch(@PathVariable String batch) {
        return studentService.getStudentsByBatch(batch);
    }

    @GetMapping("/name/{name}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByName(@PathVariable String name) {
        return studentService.getStudentsByName(name);
    }

    @GetMapping("/dept/{dept}/name/{name}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByDeptAndName(@PathVariable String dept, @PathVariable String name) {
        return studentService.getStudentsByDeptAndName(dept, name);
    }

    @GetMapping("/dept/{dept}/sec/{sec}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByDeptAndSection(@PathVariable String dept, @PathVariable String sec) {
        return studentService.getStudentsByDeptAndSection(dept, sec);
    }

    @GetMapping("/registerNo/{registerNo}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByRegisterNo(@PathVariable String registerNo) {
        return studentService.getStudentsByRegisterNo(registerNo);
    }

    @DeleteMapping("/name/{name}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteStudentByName(@PathVariable String name) {
        studentService.deleteStudentByName(name);
    }

    @DeleteMapping("/email/{email}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteStudentByEmail(@PathVariable String email) {
        studentService.deleteStudentByEmail(email);
    }
}
