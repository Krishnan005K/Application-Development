package com.mockinterview.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.backend.model.Feedback;
import com.mockinterview.backend.model.Student;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
      List<Feedback> findByStudent(Student student);
}

