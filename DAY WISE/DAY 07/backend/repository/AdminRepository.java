package com.mockinterview.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.backend.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {}

