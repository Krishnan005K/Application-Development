package com.mockinterview.mockinterview.repository;

import com.mockinterview.mockinterview.model.Interview;
import com.mockinterview.mockinterview.model.Interviewer;
import com.mockinterview.mockinterview.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByScheduleDate(LocalDate scheduleDate);
    List<Interview> findByScheduleTime(LocalTime scheduleTime);
    List<Interview> findByStudent(Student student);
    List<Interview> findByInterviewer(Interviewer interviewer);
    Optional<Interview> findById(Long id);
    List<Interview> findByTitle(String title);
    // List<Interview> findByType(String type);
    List<Interview> findByScheduleDateAfter(LocalDate date);
    List<Interview> findByStudentId(Long studentId);
    List<Interview> findByInterviewerId(Long interviewerId);
    // List<Interview> findByScheduleTime(LocalTime time);

    // New methods
    List<Interview> findByRoundName(String roundname);
    void deleteByRoundName(String roundname);
}
