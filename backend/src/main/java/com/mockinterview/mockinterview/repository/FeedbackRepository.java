package com.mockinterview.mockinterview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.mockinterview.model.Feedback;
import com.mockinterview.mockinterview.model.Student;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
      List<Feedback> findByStudent(Student student);
}

