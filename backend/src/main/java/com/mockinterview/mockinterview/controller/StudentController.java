package com.mockinterview.mockinterview.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.mockinterview.dto.StudentDTO;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.service.HeadService;
import com.mockinterview.mockinterview.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private HeadService headService;
    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD')")
    public List<StudentDTO> getAllStudents() {
        return studentService.getAllStudents();
    }
    @GetMapping("/{StudentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD', 'ROLE_STUDENT')")
    public StudentDTO getStudentById(@PathVariable Long StudentId) {
        return studentService.getStudentById(StudentId);
    }

    @GetMapping("/mentor/mentorId/{mentorId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentByMentorId(@PathVariable Long mentorId) {
        return studentService.getStudentByMentorId(mentorId);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public StudentDTO createStudent(@RequestBody StudentDTO studentDTO) {
        return studentService.addStudent(studentDTO);
    }

    @PutMapping("/updateByRegisterNo/{registerNo}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public StudentDTO updateStudentByRegisterNo(@PathVariable String registerNo, @RequestBody StudentDTO studentDetails) {
        return studentService.updateStudentByRegisterNo(registerNo, studentDetails);
    }

    @PutMapping("/updateByEmail/{email}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public StudentDTO updateStudentByEmail(@PathVariable String email, @RequestBody StudentDTO studentDetails) {
        return studentService.updateStudentByEmail(email, studentDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<StudentDTO> getStudentsByEmail(@PathVariable String email) {
        return studentService.getStudentsByEmail(email);
    }

    
    @GetMapping("/dept/head/{headId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByDept(@PathVariable Long headId) {
        String dept =headService.getDeptById(headId);
        return studentService.getStudentsByDept(dept);
    }
    @GetMapping("/dept/{dept}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<Student> getStudentsByDept(@PathVariable String dept) {
        return studentService.getStudentsByDept(dept);
    }

    @GetMapping("/ratings/{ratings}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<StudentDTO> getStudentsByRatings(@PathVariable double ratings) {
        return studentService.getStudentsByRatings(ratings);
    }

    @GetMapping("/batch/{batch}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<StudentDTO> getStudentsByBatch(@PathVariable String batch) {
        return studentService.getStudentsByBatch(batch);
    }

    @GetMapping("/name/{name}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<StudentDTO> getStudentsByName(@PathVariable String name) {
        return studentService.getStudentsByName(name);
    }

    @GetMapping("/dept/{dept}/name/{name}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<StudentDTO> getStudentsByDeptAndName(@PathVariable String dept, @PathVariable String name) {
        return studentService.getStudentsByDeptAndName(dept, name);
    }

    @GetMapping("/dept/{dept}/sec/{sec}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<StudentDTO> getStudentsByDeptAndSection(@PathVariable String dept, @PathVariable String sec) {
        return studentService.getStudentsByDeptAndSection(dept, sec);
    }

    @GetMapping("/registerNo/{registerNo}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MENTOR', 'ROLE_HEAD')")
    public List<StudentDTO> getStudentsByRegisterNo(@PathVariable String registerNo) {
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
