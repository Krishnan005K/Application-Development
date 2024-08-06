package com.mockinterview.mockinterview.repository;

import com.mockinterview.mockinterview.model.Interviewer;
// import com.mockinterview.mockinterview.model.Student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewerRepository extends JpaRepository<Interviewer, Long> {
    List<Interviewer> findByName(String name);
    List<Interviewer> findByEmail(String email);
    //  List<Student> findByBatchAndDeptAndSection(String batch, String dept, String section);
}
