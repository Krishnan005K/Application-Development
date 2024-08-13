package com.mockinterview.mockinterview.repository;

import com.mockinterview.mockinterview.model.InterviewCompletion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterviewCompletionRepository extends JpaRepository<InterviewCompletion, Long> {
    List<InterviewCompletion> findByStudentId(Long studentId);
    List<InterviewCompletion> findByInterviewId(Long interviewId);
}
