package com.mockinterview.backend.service;

import com.mockinterview.backend.model.Head;
import com.mockinterview.backend.model.Mentor;
import com.mockinterview.backend.model.Student;
import com.mockinterview.backend.repository.HeadRepository;
import com.mockinterview.backend.repository.MentorRepository;
import com.mockinterview.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private HeadRepository headRepository;

    // Get all students grouped by department
    public Map<String, List<Student>> getStudentsByDepartment() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getDept));
    }

    // Get students by specific department
    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    // Get all students grouped by department and batch
    public Map<String, Map<String, List<Student>>> getStudentsByDeptAndBatch() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getDept,
                        Collectors.groupingBy(Student::getBatch)));
    }

    // Get students by department and batch
    public List<Student> getStudentsByDeptAndBatch(String dept, String batch) {
        return studentRepository.findByDeptAndBatch(dept, batch);
    }

    // Get all students grouped by department, batch, and class
    public Map<String, Map<String, Map<String, List<Student>>>> getStudentsByDeptBatchAndClass() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getDept,
                        Collectors.groupingBy(Student::getBatch,
                                Collectors.groupingBy(Student::getSection))));
    }

    // Get students by department, batch, and section
    public List<Student> getStudentsByDeptBatchAndSection(String dept, String batch, String section) {
        return studentRepository.findByDeptAndBatchAndSection(dept, batch, section);
    }

    // Get all mentors
    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }

    // Get mentors by department
    public List<Mentor> getMentorsByDept(String dept) {
        return mentorRepository.findByDept(dept);
    }

    // Get mentors by class being mentored
    public List<Mentor> getMentorsByClass(String classBeingMentored) {
        return mentorRepository.findByClassBeingMentored(classBeingMentored);
    }

    // Get all heads
    public List<Head> getAllHeads() {
        return headRepository.findAll();
    }

    // Get heads by department
    public List<Head> getHeadsByDept(String dept) {
        return headRepository.findByDepartment(dept);
    }

    // Helper method to calculate overall rating
    private double calculateOverallRating(List<Student> students) {
        if (students.isEmpty()) return 0;
        double totalRating = 0;
        for (Student student : students) {
            totalRating += student.getRatings();
        }
        return totalRating / students.size();
    }

    // DTO for batch, department, and section statistics
    public static class BatchDeptSectionStats {
        private int studentCount;
        private double overallRating;

        public BatchDeptSectionStats(int studentCount, double overallRating) {
            this.studentCount = studentCount;
            this.overallRating = overallRating;
        }

        public int getStudentCount() {
            return studentCount;
        }

        public void setStudentCount(int studentCount) {
            this.studentCount = studentCount;
        }

        public double getOverallRating() {
            return overallRating;
        }

        public void setOverallRating(double overallRating) {
            this.overallRating = overallRating;
        }
    }
}
