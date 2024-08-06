package com.mockinterview.mockinterview.repository;

import com.mockinterview.mockinterview.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {

    @Query("SELECT m FROM Mentor m WHERE m.dept = :dept AND m.classBeingMentored = :classBeingMentored")
    List<Mentor> findMentorsByDeptAndClassBeingMentored(@Param("dept") String dept, @Param("classBeingMentored") String classBeingMentored);

    List<Mentor> findByEmail(String email);
    List<Mentor> findByDept(String dept);
    List<Mentor> findByClassBeingMentored(String classBeingMentored);
    List<Mentor> findByName(String name);
    List<Mentor> findByDeptAndClassBeingMentored(String dept, String classBeingMentored);
    void deleteByEmail(String email);
}
