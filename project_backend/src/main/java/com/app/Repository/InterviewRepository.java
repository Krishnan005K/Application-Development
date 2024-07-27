package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.models.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByCandidateId(Long candidateId);

    List<Interview> findByInterviewerId(Long interviewerId);

    @Modifying
    @Query(value = "UPDATE Interview SET scheduledDate = :scheduledDate WHERE id = :id")
    int rescheduleInterview(@Param("scheduledDate") String scheduledDate, @Param("id") Long id);
}
