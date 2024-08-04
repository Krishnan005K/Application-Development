package com.mockinterview.backend.service;

import com.mockinterview.backend.model.Student;
import com.mockinterview.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
   

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student addStudent(Student student) {

        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Optional<Student> studentOptional = studentRepository.findById(id);
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

    public List<Student> getStudentsBySection(String section) {
        return studentRepository.findBySection(section);
    }

    public List<Student> getStudentsByRatings(double ratings) {
        return studentRepository.findByRatings(ratings);
    }

    public List<Student> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch);
    }
}
