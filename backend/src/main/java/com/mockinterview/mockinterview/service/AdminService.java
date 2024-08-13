package com.mockinterview.mockinterview.service;

import com.mockinterview.mockinterview.model.*;
import com.mockinterview.mockinterview.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private InterviewRepository interviewRepository; // Assuming this exists

    @Autowired
    private InterviewerRepository interviewerRepository; // Assuming this exists

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Get all students grouped by department
    public Map<String, List<Student>> getStudentsByDept() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getDept));
    }

    // Get students by specific department
    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Interviewer> getAllInterviewers() {
        return interviewerRepository.findAll();
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

    // Get mentor by email
    public Mentor getMentorByEmail(String email) {
        List<Mentor> mentors = mentorRepository.findByEmail(email);
        return mentors.isEmpty() ? null : mentors.get(0); // Handle case if no mentor is found
    }

    // Get mentors by department and section
    // public List<Mentor> getMentorsByDeptAndclassBeingMentored(String dept, String classBeingMentored) {
    //     return mentorRepository.findByDeptAndClassBeingMentored(dept, classBeingMentored);
    // }

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
        return headRepository.findByDept(dept);
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

    // public List<Student> getStudentsByRating(double ratings) {
    //     return studentRepository.findByRatings(ratings);
    // }

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

    // CRUD operations for Admin
    public Admin saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public Admin updateAdmin(Long id, Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setId(id);
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    // CRUD operations for Student
    public Student saveStudent(Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setRoles("ROLE_STUDENT");
        userRepository.save(student);
        return studentRepository.save(student);
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student updateStudent(Long id, Student student) {
        student.setId(id);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }

    public void deleteStudentById(Long id) {
        studentRepository.deleteById(id);
    }

    public List<Student> getStudentsByRatings(double ratings) {
        return studentRepository.findByRatingsGreaterThanEqual(ratings);
    }



    // CRUD operations for Mentor
    public Mentor saveMentor(Mentor mentor) {
        mentor.setPassword(passwordEncoder.encode(mentor.getPassword()));
        mentor.setRoles("ROLE_MENTOR");
        userRepository.save(mentor);
        return mentorRepository.save(mentor);
    }

    public Mentor getMentorById(Long id) {
        return mentorRepository.findById(id).orElse(null);
    }

    public Mentor updateMentorByName(String name, Mentor mentorDetails) {
        List<Mentor> mentors = mentorRepository.findByName(name);
        if (!mentors.isEmpty()) {
            Mentor mentor = mentors.get(0); // Update the first mentor found or handle as needed
            mentor.setName(mentorDetails.getName());
            mentor.setDept(mentorDetails.getDept());
            mentor.setEmail(mentorDetails.getEmail());
            return mentorRepository.save(mentor);
        } else {
            throw new RuntimeException("Mentor not found with name: " + name);
        }
    }

    public Mentor updateMentor(Long id, Mentor mentor) {
        mentor.setId(id);
        mentor.setPassword(passwordEncoder.encode(mentor.getPassword()));
        return mentorRepository.save(mentor);
    }

    public void deleteMentorById(Long id) {
        mentorRepository.deleteById(id);
    }

    // CRUD operations for Head
    public Head saveHead(Head head) {
        head.setPassword(passwordEncoder.encode(head.getPassword()));
        head.setRoles("ROLE_HEAD");
        userRepository.save(head);
        return headRepository.save(head);
    }

    public Head getHeadById(Long id) {
        return headRepository.findById(id).orElse(null);
    }

    public Head updateHead(Long id, Head head) {
        head.setId(id);
        head.setPassword(passwordEncoder.encode(head.getPassword()));
        return headRepository.save(head);
    }

    public void deleteHeadById(Long id) {
        headRepository.deleteById(id);
    }

    public void deleteStudentByDeptAndEmail(String dept, String email) {
        List<Student> students = studentRepository.findByDeptAndEmail(dept, email);
        if (!students.isEmpty()) {
            studentRepository.deleteAll(students);
        } else {
            throw new RuntimeException("Student not found with department: " + dept + " and email: " + email);
        }
    }

    public Interviewer saveInterviewer(Interviewer interviewer) {
        interviewer.setPassword(passwordEncoder.encode(interviewer.getPassword()));
        interviewer.setRoles("ROLE_INTERVIEWER");
        userRepository.save(interviewer);
        return interviewerRepository.save(interviewer);
    }
    
    public void deleteInterviewerById(Long id) {
        interviewerRepository.deleteById(id);
    }
    public Interviewer updateInterviewerById(Long id, Interviewer interviewer) {
        interviewer.setId(id);
        interviewer.setPassword(passwordEncoder.encode(interviewer.getPassword()));
        return interviewerRepository.save(interviewer);

    }    // New methods for Interview and Interviewer
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public Interview saveInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    public List<Interviewer> getInterviewerByEmail(String email) {
        return interviewerRepository.findByEmail(email);
    }
  
    public List<Mentor> getMentorsByDeptAndclassBeingMentored(String dept, String classBeingMentored) {
        return mentorRepository.findByDeptAndClassBeingMentored(dept, classBeingMentored);
    }

    public List<Student> getStudentsByDeptAndName(String dept, String name) {
        return studentRepository.findByDeptAndName(dept, name);
    }

    public List<Student> getStudentsByDeptAndEmail(String dept, String email) {
        return studentRepository.findByDeptAndEmail(dept, email);
    }
    
}
