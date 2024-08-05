package com.mockinterview.mockinterview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
        if (student.getRatings() == null) {
            student.setRatings(0.0); // or any other default value
        }
        return studentRepository.save(student);
    }


    public Student updateStudent(Student studentDetails) {
        Optional<Student> studentOptional = studentRepository.findById(studentDetails.getId());
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            student.setPassword(studentDetails.getPassword());
            student.setContact(studentDetails.getContact());
            student.setPhoto(studentDetails.getPhoto());
            student.setRatings(studentDetails.getRatings());
            student.setDept(studentDetails.getDept());
            student.setBatch(studentDetails.getBatch());
            student.setSection(studentDetails.getSection());
            return studentRepository.save(student);
        }
        return null;
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public List<Student> getStudentsByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    // public List<Student> getStudentsBySection(String section) {
    //     return studentRepository.findBySection(section);
    // }

    public List<Student> getStudentsByRatings(double ratings) {
        return studentRepository.findByRatings(ratings);
    }

    public List<Student> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch);
    }

    public List<Student> getStudentsByName(String name) {
        return studentRepository.findByName(name);
    }

    public List<Student> getStudentsByDeptAndName(String dept, String name) {
        return studentRepository.findByDeptAndName(dept, name);
    }

    // public List<Student> getStudentsByDeptAndId(String dept, Long id) {
    //     return studentRepository.findByDeptAndId(dept, id);
    // }

    public List<Student> getStudentsByDeptAndSection(String dept, String sec) {
        return studentRepository.findByDeptAndSection(dept, sec);
    }

    public void deleteStudentByName(String name) {
        List<Student> students = studentRepository.findByName(name);
        if (!students.isEmpty()) {
            studentRepository.delete(students.get(0)); // Assuming name is unique
        }
    }

    public void deleteStudentByEmail(String email) {
        List<Student> students = studentRepository.findByEmail(email);
        if (!students.isEmpty()) {
            studentRepository.delete(students.get(0)); // Assuming email is unique
        }
    }
    public List<Student> getStudentsByRegisterNo(String registerNo) {
        return studentRepository.findByRegisterNo(registerNo);
    }

    public Student updateStudentByRegisterNo(String registerNo, Student studentDetails) {
        List<Student> students = studentRepository.findByRegisterNo(registerNo);
        if (!students.isEmpty()) {
            Student existingStudent = students.get(0);
            // Update the existing student with new details
            existingStudent.setName(studentDetails.getName());
            existingStudent.setEmail(studentDetails.getEmail());
            // Set other fields as necessary
            return studentRepository.save(existingStudent);
        } else {
            throw new EntityNotFoundException("Student with registerNo " + registerNo + " not found");
        }
    }
    

    // public Student addStudent(Student student) {
    //     // Ensure ratings is handled properly, possibly set a default if not provided
    //     if (student.getRatings() == null) {
    //         student.setRatings(0.0); // or any other default value
    //     }
    //     return studentRepository.save(student);
    // }
    
    public Student updateStudentByEmail(String email, Student studentDetails) {
        List<Student> students = studentRepository.findByEmail(email);
        if (!students.isEmpty()) {
            Student existingStudent = students.get(0);
            // Update the existing student with new details
            existingStudent.setName(studentDetails.getName());
            existingStudent.setRegisterNo(studentDetails.getRegisterNo());
            // Set other fields as necessary
            return studentRepository.save(existingStudent);
        } else {
            throw new EntityNotFoundException("Student with email " + email + " not found");
        }
    }

    public List<Student> getStudentsByBatchDeptAndSection(String batch, String dept, String section) {
        return studentRepository.findByBatchAndDeptAndSection(batch, dept, section);
    }
    
}