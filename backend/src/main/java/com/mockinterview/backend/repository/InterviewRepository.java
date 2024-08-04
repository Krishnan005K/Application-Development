package com.mockinterview.backend.repository;

import com.mockinterview.backend.model.Interview;
import com.mockinterview.backend.model.Interviewer;
import com.mockinterview.backend.model.Student;
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
    List<Interview> findByType(String type);
    List<Interview> findByScheduleDateAfter(LocalDate date);
    List<Interview> findByStudentId(Long studentId);
    List<Interview> findByInterviewerId(Long interviewerId);
}
