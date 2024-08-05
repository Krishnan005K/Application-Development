package com.mockinterview.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.backend.model.Head;

public interface HeadRepository extends JpaRepository<Head, Long> {
    Optional<Head> findByEmail(String email);
    List<Head> findByDepartment(String department);

      
}

