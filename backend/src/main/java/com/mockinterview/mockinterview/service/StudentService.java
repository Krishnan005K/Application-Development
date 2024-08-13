package com.mockinterview.mockinterview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mockinterview.mockinterview.dto.StudentDTO;
import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public StudentDTO addStudent(StudentDTO studentDTO) {
        Student student = convertToEntity(studentDTO);
        if (student.getRatings() == null) {
            student.setRatings(0.0); // or any other default value
        }
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        Student savedStudent = studentRepository.save(student);
        return convertToDTO(savedStudent);
    }

    public List<Student> getStudentByMentorId(Long mentorId) {
        List<Student> students = studentRepository.findByMentorId(mentorId);
       return students;
    }

    public StudentDTO updateStudent(StudentDTO studentDTO) {
        Optional<Student> studentOptional = studentRepository.findById(studentDTO.getId());
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            student.setName(studentDTO.getName());
            student.setEmail(studentDTO.getEmail());
            student.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
            student.setContact(studentDTO.getContact());
            student.setPhoto(studentDTO.getPhoto());
            student.setRatings(studentDTO.getRatings());
            student.setDept(studentDTO.getDept());
            student.setBatch(studentDTO.getBatch());
            student.setSection(studentDTO.getSection());
            Student updatedStudent = studentRepository.save(student);
            return convertToDTO(updatedStudent);
        }
        return null;
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public StudentDTO getStudentById(Long id) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            return convertToDTO(student);
        }
        throw new EntityNotFoundException("Student not found with id: " + id);
    }

    public List<StudentDTO> getStudentsByEmail(String email) {
        return studentRepository.findByEmail(email).stream().map(this::convertToDTO).toList();
    }

    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    public List<StudentDTO> getStudentsByRatings(double ratings) {
        return studentRepository.findByRatings(ratings).stream().map(this::convertToDTO).toList();
    }

    public List<StudentDTO> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch).stream().map(this::convertToDTO).toList();
    }

    public List<StudentDTO> getStudentsByName(String name) {
        return studentRepository.findByName(name).stream().map(this::convertToDTO).toList();
    }

    public List<StudentDTO> getStudentsByDeptAndName(String dept, String name) {
        return studentRepository.findByDeptAndName(dept, name).stream().map(this::convertToDTO).toList();
    }

    public List<StudentDTO> getStudentsByDeptAndSection(String dept, String sec) {
        return studentRepository.findByDeptAndSection(dept, sec).stream().map(this::convertToDTO).toList();
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

    public List<StudentDTO> getStudentsByRegisterNo(String registerNo) {
        return studentRepository.findByRegisterNo(registerNo).stream().map(this::convertToDTO).toList();
    }

    public StudentDTO updateStudentByRegisterNo(String registerNo, StudentDTO studentDTO) {
        List<Student> students = studentRepository.findByRegisterNo(registerNo);
        if (!students.isEmpty()) {
            Student existingStudent = students.get(0);
            existingStudent.setName(studentDTO.getName());
            existingStudent.setEmail(studentDTO.getEmail());
            existingStudent.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
            existingStudent.setPhoto(studentDTO.getPhoto());
            existingStudent.setContact(studentDTO.getContact());
            existingStudent.setRatings(studentDTO.getRatings());
            existingStudent.setDept(studentDTO.getDept());
            existingStudent.setBatch(studentDTO.getBatch());
            existingStudent.setSection(studentDTO.getSection());
            existingStudent.setRegisterNo(studentDTO.getRegisterNo());
            return convertToDTO(studentRepository.save(existingStudent));
        } else {
            throw new EntityNotFoundException("Student with registerNo " + registerNo + " not found");
        }
    }

    public StudentDTO updateStudentByEmail(String email, StudentDTO studentDTO) {
        List<Student> students = studentRepository.findByEmail(email);
        if (!students.isEmpty()) {
            Student existingStudent = students.get(0);
            existingStudent.setName(studentDTO.getName());
            existingStudent.setEmail(studentDTO.getEmail());
            existingStudent.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
            existingStudent.setPhoto(studentDTO.getPhoto());
            existingStudent.setContact(studentDTO.getContact());
            existingStudent.setRatings(studentDTO.getRatings());
            existingStudent.setDept(studentDTO.getDept());
            existingStudent.setBatch(studentDTO.getBatch());
            existingStudent.setSection(studentDTO.getSection());
            existingStudent.setRegisterNo(studentDTO.getRegisterNo());
            return convertToDTO(studentRepository.save(existingStudent));
        } else {
            throw new EntityNotFoundException("Student with email " + email + " not found");
        }
    }

    public List<StudentDTO> getStudentsByBatchDeptAndSection(String batch, String dept, String section) {
        return studentRepository.findByBatchAndDeptAndSection(batch, dept, section).stream().map(this::convertToDTO)
                .toList();
    }

    private StudentDTO convertToDTO(Student student) {
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setId(student.getId());
        studentDTO.setName(student.getName());
        studentDTO.setEmail(student.getEmail());
        studentDTO.setPassword(student.getPassword());
        studentDTO.setPhoto(student.getPhoto());
        studentDTO.setContact(student.getContact());
        studentDTO.setRatings(student.getRatings());
        studentDTO.setDept(student.getDept());
        studentDTO.setBatch(student.getBatch());
        studentDTO.setSection(student.getSection());
        studentDTO.setRegisterNo(student.getRegisterNo());
        return studentDTO;
    }

    private Student convertToEntity(StudentDTO studentDTO) {
        Student student = new Student();
        student.setId(studentDTO.getId());
        student.setName(studentDTO.getName());
        student.setEmail(studentDTO.getEmail());
        student.setPassword(studentDTO.getPassword());
        student.setPhoto(studentDTO.getPhoto());
        student.setContact(studentDTO.getContact());
        student.setRatings(studentDTO.getRatings());
        student.setDept(studentDTO.getDept());
        student.setBatch(studentDTO.getBatch());
        student.setSection(studentDTO.getSection());
        student.setRegisterNo(studentDTO.getRegisterNo());
        return student;
    }
}
