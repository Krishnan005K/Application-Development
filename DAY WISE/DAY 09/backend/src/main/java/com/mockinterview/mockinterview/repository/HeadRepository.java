package com.mockinterview.mockinterview.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.mockinterview.model.Head;
import com.mockinterview.mockinterview.model.Student;

public interface HeadRepository extends JpaRepository<Head, Long> {
    Optional<Head> findByEmail(String email);
    List<Head> findByDept(String dept);
    // Optional<Student>findstuByEmail(String email);
    Optional<Student> findStudentByEmail(String email);
    // Optional<Student> findByBatchAndDeptAndSection(String batch, String dept, String section);
}
