package com.mockinterview.backend.repository;

import com.mockinterview.backend.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {
    List<Mentor> findByHeadDepartment(String department);
    List<Mentor> findByEmail(String email);
    List<Mentor> findByDept(String dept);
    List<Mentor> findByClassBeingMentored(String classBeingMentored);
}
