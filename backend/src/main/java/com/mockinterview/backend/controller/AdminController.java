package com.mockinterview.backend.controller;

import com.mockinterview.backend.model.Head;
import com.mockinterview.backend.model.Mentor;
import com.mockinterview.backend.model.Student;
import com.mockinterview.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/students/department")
    public Map<String, List<Student>> getStudentsByDepartment() {
        return adminService.getStudentsByDepartment();
    }

    @GetMapping("/students/department/{dept}")
    public List<Student> getStudentsByDept(@PathVariable String dept) {
        return adminService.getStudentsByDept(dept);
    }

    @GetMapping("/students/dept-batch")
    public Map<String, Map<String, List<Student>>> getStudentsByDeptAndBatch() {
        return adminService.getStudentsByDeptAndBatch();
    }

    @GetMapping("/students/dept/{dept}/batch/{batch}")
    public List<Student> getStudentsByDeptAndBatch(@PathVariable String dept, @PathVariable String batch) {
        return adminService.getStudentsByDeptAndBatch(dept, batch);
    }

    @GetMapping("/students/dept-batch-class")
    public Map<String, Map<String, Map<String, List<Student>>>> getStudentsByDeptBatchAndClass() {
        return adminService.getStudentsByDeptBatchAndClass();
    }

    @GetMapping("/students/dept/{dept}/batch/{batch}/class/{section}")
    public List<Student> getStudentsByDeptBatchAndSection(@PathVariable String dept, @PathVariable String batch, @PathVariable String section) {
        return adminService.getStudentsByDeptBatchAndSection(dept, batch, section);
    }

    @GetMapping("/mentors")
    public List<Mentor> getAllMentors() {
        return adminService.getAllMentors();
    }

    @GetMapping("/mentors/department/{dept}")
    public List<Mentor> getMentorsByDept(@PathVariable String dept) {
        return adminService.getMentorsByDept(dept);
    }

    @GetMapping("/mentors/class/{classBeingMentored}")
    public List<Mentor> getMentorsByClass(@PathVariable String classBeingMentored) {
        return adminService.getMentorsByClass(classBeingMentored);
    }

    @GetMapping("/heads")
    public List<Head> getAllHeads() {
        return adminService.getAllHeads();
    }

    @GetMapping("/heads/department/{dept}")
    public List<Head> getHeadsByDept(@PathVariable String dept) {
        return adminService.getHeadsByDept(dept);
    }
}
