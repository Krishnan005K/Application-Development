package com.mockinterview.mockinterview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mockinterview.mockinterview.model.Head;
import com.mockinterview.mockinterview.model.Mentor;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.repository.HeadRepository;
import com.mockinterview.mockinterview.repository.MentorRepository;
import com.mockinterview.mockinterview.repository.StudentRepository;

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
            head.setDept(headDetails.getDept());
            head.setPassword(headDetails.getPassword());
            head.setPhoto(headDetails.getPhoto());
            return headRepository.save(head);
        } else {
            throw new RuntimeException("Head not found with email: " + email);
        }
    }

    // Delete a Head by email
    public void deleteHead(String email) {
        Optional<Head> optionalHead = headRepository.findByEmail(email);
        if (optionalHead.isPresent()) {
            headRepository.delete(optionalHead.get());
        } else {
            throw new RuntimeException("Head not found with email: " + email);
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

    // Get overall ratings
    public double getOverallRatingByDepartmentAndSection(String dept, String section) {
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

    public double getOverallRatingByDept(String dept) {
        List<Student> students = studentRepository.findByDept(dept);
        return calculateOverallRating(students);
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

    // Mentor CRUD operations
    public Mentor addMentor(Mentor mentor) {
        return mentorRepository.save(mentor);
    }

    public Mentor updateMentorById(Long id, Mentor mentorDetails) {
        Optional<Mentor> optionalMentor = mentorRepository.findById(id);
        if (optionalMentor.isPresent()) {
            Mentor mentor = optionalMentor.get();
            mentor.setName(mentorDetails.getName());
            mentor.setEmail(mentorDetails.getEmail());
            mentor.setClassBeingMentored(mentorDetails.getClassBeingMentored());
            return mentorRepository.save(mentor);
        } else {
            return null;
        }
    }

    public void deleteMentorById(Long id) {
        Optional<Mentor> optionalMentor = mentorRepository.findById(id);
        if (optionalMentor.isPresent()) {
            mentorRepository.delete(optionalMentor.get());
        }
    }
  
    public List<Student> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch);
    }

    public Mentor getMentorById(Long id) {
        return mentorRepository.findById(id).orElse(null);
    }

    public Mentor getMentorByEmail(String email) {
        List<Mentor> mentors = mentorRepository.findByEmail(email);
        if (!mentors.isEmpty()) {
            return mentors.get(0);  // Assuming you want the first mentor in the list
        } else {
            return null;
        }
    }

    public List<Mentor> getMentorsByClassBeingMentored(String classBeingMentored) {
        return mentorRepository.findByClassBeingMentored(classBeingMentored);
    }

    // Student CRUD operations
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudentById(Long id, Student studentDetails) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            // Student student = optionalStudent.get();
            Student existingStudent = optionalStudent.get();
            existingStudent.setName(studentDetails.getName());
            existingStudent.setEmail(studentDetails.getEmail());
            existingStudent.setPassword(studentDetails.getPassword());
            existingStudent.setPhoto(studentDetails.getPhoto());
            existingStudent.setContact(studentDetails.getContact());
            existingStudent.setRatings(studentDetails.getRatings());
            existingStudent.setDept(studentDetails.getDept());
            existingStudent.setBatch(studentDetails.getBatch());
            existingStudent.setSection(studentDetails.getSection());
            existingStudent.setRegisterNo(studentDetails.getRegisterNo());
            return studentRepository.save(existingStudent);
        } else {
            return null;
        }
    }

    public void deleteStudentById(Long id) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            studentRepository.delete(optionalStudent.get());
        }
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // public Student getStudentByEmail(String email) {
    //     return studentRepository.findByEmail(email).orElse(null);
    // }

    // public List<Student> getStudentsByMentorEmail(String mentorEmail) {
    //     return studentRepository.findByMentorEmail(mentorEmail);
    // }

    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    public List<Student> getStudentsByMentorEmail(String mentorEmail) {
        List<Mentor> mentors = mentorRepository.findByEmail(mentorEmail);
        if (!mentors.isEmpty()) {
            return studentRepository.findByMentor(mentors.get(0));  // Assuming you want the first mentor in the list
        } else {
            return List.of();
        }
    }

    // Helper method to calculate overall rating
    private double calculateOverallRating(List<Student> students) {
        if (students.isEmpty()) {
            return 0;
        }
        double totalRating = 0;
        for (Student student : students) {
            totalRating += student.getRatings();
        }
        return totalRating / students.size();
    }

    // Nested class for batch, department, and section stats
    public static class BatchDeptSectionStats {
        private final int studentCount;
        private final double overallRating;

        public BatchDeptSectionStats(int studentCount, double overallRating) {
            this.studentCount = studentCount;
            this.overallRating = overallRating;
        }

        public int getStudentCount() {
            return studentCount;
        }

        public double getOverallRating() {
            return overallRating;
        }
    }
    public Student getStudentByEmail(String email) {
        return headRepository.findStudentByEmail(email).orElse(null);
    }
    // public Student getStudentByBatchAndDeptAndSection(String batch, String dept, String section) {
    //     return headRepository.findByBatchAndDeptAndSection(batch, dept, section).orElse(null);
    // }


    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Mentor> getAllMentors() {
        return mentorRepository.findAll();
    }
}
