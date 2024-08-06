package com.mockinterview.mockinterview.repository;

import com.mockinterview.mockinterview.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
   Optional< User> findByEmail(String email);
}
