package com.mockinterview.backend.repository;

import com.mockinterview.backend.model.Mentor;
import com.mockinterview.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByEmail(String email);

    List<Student> findByDept(String dept);

    List<Student> findBySection(String section);

    List<Student> findByRatings(double ratings);

    List<Student> findByBatch(String batch);

    
    List<Student> findByDeptAndBatchAndSection(String dept, String batch, String section);

    List<Student> findByMentor(Mentor mentor);
    List<Student> findByDeptAndBatch(String dept, String batch);
    List<Student> findByBatchAndDept(String batch, String dept);
}



