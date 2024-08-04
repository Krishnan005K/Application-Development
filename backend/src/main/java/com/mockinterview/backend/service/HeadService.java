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
import java.util.Optional;

@Service
public class HeadService {

    
    @Autowired
    private HeadRepository headRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Add a new Head
    public Head addHead(Head head) {
        return headRepository.save(head);
    }

    // Update an existing Head
    public Head updateHead(String email, Head headDetails) {
        Optional<Head> optionalHead = headRepository.findByEmail(email);
        if (optionalHead.isPresent()) {
            Head head = optionalHead.get();
            head.setName(headDetails.getName());
            head.setDepartment(headDetails.getDepartment());
            return headRepository.save(head);
        } else {
            return null; // Handle head not found case
        }
    }

    // Delete a Head by email
    public void deleteHead(String email) {
        Optional<Head> optionalHead = headRepository.findByEmail(email);
        if (optionalHead.isPresent()) {
            headRepository.delete(optionalHead.get());
        }
    }

    // Get a Head by email
    public Head getHeadByEmail(String email) {
        return headRepository.findByEmail(email).orElse(null);
    }

    // Get all Heads
    public List<Head> getAllHeads() {
        return headRepository.findAll();
    }

    // Get overall ratings for a specific section, class, department, and batch
    public double getOverallRatingBySection(String section) {
        List<Student> students = studentRepository.findBySection(section);
        return calculateOverallRating(students);
    }

    public double getOverallRatingByClass(String classBeingMentored) {
        List<Mentor> mentors = mentorRepository.findByClassBeingMentored(classBeingMentored);
        double totalRating = 0;
        int count = 0;
        for (Mentor mentor : mentors) {
            List<Student> students = studentRepository.findByMentor(mentor);
            totalRating += calculateOverallRating(students);
            count++;
        }
        return count == 0 ? 0 : totalRating / count;
    }

    public double getOverallRatingByDepartment(String department) {
        List<Student> students = studentRepository.findByDept(department);
        return calculateOverallRating(students);
    }
    public List<Student> getStudentsByMentorEmail(String mentorEmail) {
        Mentor mentor = mentorRepository.findByEmail(mentorEmail).orElse(null);
        if (mentor != null) {
            return studentRepository.findByMentor(mentor);
        } else {
            return List.of(); // Or handle the case where the mentor is not found
        }
    }
    
    public double getOverallRatingByBatch(String batch) {
        List<Student> students = studentRepository.findByBatch(batch);
        return calculateOverallRating(students);
    }

    // Get statistics for a specific batch, department, and section
    public BatchDeptSectionStats getBatchDeptSectionStats(String batch, String dept, String section) {
        List<Student> students = studentRepository.findByDeptAndBatchAndSection(dept, batch, section);
        return new BatchDeptSectionStats(
                students.size(),
                calculateOverallRating(students)
        );
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
