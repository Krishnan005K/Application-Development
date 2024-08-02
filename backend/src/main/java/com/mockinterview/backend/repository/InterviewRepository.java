package com.mockinterview.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.backend.model.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Long> {}

