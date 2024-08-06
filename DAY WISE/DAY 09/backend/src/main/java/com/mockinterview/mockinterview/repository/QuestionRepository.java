package com.mockinterview.mockinterview.repository;

import com.mockinterview.mockinterview.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByInterviewId(Long interviewId);
}
