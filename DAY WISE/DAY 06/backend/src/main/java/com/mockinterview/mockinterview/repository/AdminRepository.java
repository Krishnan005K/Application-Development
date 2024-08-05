package com.mockinterview.mockinterview.repository;
// package com.mockinterview.mockinterview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.mockinterview.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {}


