package com.mockinterview.mockinterview.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }
   

    @PutMapping("/updateByRegisterNo/{registerNo}")
public Student updateStudentByRegisterNo(@PathVariable String registerNo, @RequestBody Student studentDetails) {
    return studentService.updateStudentByRegisterNo(registerNo, studentDetails);
}

@PutMapping("/updateByEmail/{email}")
public Student updateStudentByEmail(@PathVariable String email, @RequestBody Student studentDetails) {
    return studentService.updateStudentByEmail(email, studentDetails);
}


    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @GetMapping("/email/{email}")
    public List<Student> getStudentsByEmail(@PathVariable String email) {
        return studentService.getStudentsByEmail(email);
    }

    @GetMapping("/dept/{dept}")
    public List<Student> getStudentsByDept(@PathVariable String dept) {
        return studentService.getStudentsByDept(dept);
    }

    // @GetMapping("/section/{section}")
    // public List<Student> getStudentsBySection(@PathVariable String section) {
    //     return studentService.getStudentsBySection(section);
    // }

    @GetMapping("/ratings/{ratings}")
    public List<Student> getStudentsByRatings(@PathVariable double ratings) {
        return studentService.getStudentsByRatings(ratings);
    }

    @GetMapping("/batch/{batch}")
    public List<Student> getStudentsByBatch(@PathVariable String batch) {
        return studentService.getStudentsByBatch(batch);
    }

    @GetMapping("/name/{name}")
    public List<Student> getStudentsByName(@PathVariable String name) {
        return studentService.getStudentsByName(name);
    }

    @GetMapping("/dept/{dept}/name/{name}")
    public List<Student> getStudentsByDeptAndName(@PathVariable String dept, @PathVariable String name) {
        return studentService.getStudentsByDeptAndName(dept, name);
    }

    // @GetMapping("/dept/{dept}/id/{id}")
    // public List<Student> getStudentsByDeptAndId(@PathVariable String dept, @PathVariable Long id) {
    //     return studentService.getStudentsByDeptAndId(dept, id);
    // }

    @GetMapping("/dept/{dept}/sec/{sec}")
    public List<Student> getStudentsByDeptAndSection(@PathVariable String dept, @PathVariable String sec) {
        return studentService.getStudentsByDeptAndSection(dept, sec);
    }

    @GetMapping("/registerNo/{registerNo}")
    public List<Student> getStudentsByRegisterNo(@PathVariable String registerNo) {
        return studentService.getStudentsByRegisterNo(registerNo);  // New endpoint
    }

    @DeleteMapping("/name/{name}")
    public void deleteStudentByName(@PathVariable String name) {
        studentService.deleteStudentByName(name);
    }

    @DeleteMapping("/email/{email}")
    public void deleteStudentByEmail(@PathVariable String email) {
        studentService.deleteStudentByEmail(email);
    }
}
