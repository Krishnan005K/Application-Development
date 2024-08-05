package com.mockinterview.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.backend.model.Interviewer;

public interface InterviewerRepository extends JpaRepository<Interviewer, Long> {
    
}

