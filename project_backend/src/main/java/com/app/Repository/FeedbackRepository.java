package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.models.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByInterviewId(Long interviewId);

    @Query(value = "SELECT f FROM Feedback f WHERE f.interview.candidate.id = :candidateId")
    List<Feedback> findByCandidateId(@Param("candidateId") Long candidateId);
}
