package com.app.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.models.Interviewer;

public interface InterviewerRepository extends JpaRepository<Interviewer, Long> {
    Optional<Interviewer> findByEmailAndPassword(String email, String password);

    @Modifying
    @Query("UPDATE Interviewer i SET i.password = :password WHERE i.email = :email")
    int updatePassword(@Param("password") String password, @Param("email") String email);
}
