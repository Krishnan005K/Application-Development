package com.mockinterview.mockinterview.service;

import com.mockinterview.mockinterview.model.Interview;
import com.mockinterview.mockinterview.model.Question;
import com.mockinterview.mockinterview.repository.InterviewRepository;
import com.mockinterview.mockinterview.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {
    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Interview addInterview(Interview interview) {
        // Save the interview
        interview.setScheduleTime(interview.getScheduleTime().truncatedTo(ChronoUnit.MINUTES));
        Interview savedInterview = interviewRepository.save(interview);
        
        // Save each question and set its interview reference
        for (Question question : interview.getQuestions()) {
            question.setInterview(savedInterview);
            questionRepository.save(question);
        }
        
        return savedInterview;
    }

    public Interview updateInterview(Long id, Interview interviewDetails) {
        Optional<Interview> optionalInterview = interviewRepository.findById(id);
        if (optionalInterview.isPresent()) {
            Interview interview = optionalInterview.get();
            interview.setTitle(interviewDetails.getTitle());
            interview.setDescription(interviewDetails.getDescription());
            interview.setRoundName(interviewDetails.getRoundName());
            interview.setScheduleDate(interviewDetails.getScheduleDate());
            interview.setScheduleTime(interviewDetails.getScheduleTime().truncatedTo(ChronoUnit.MINUTES));
            
            // Update questions
            for (Question question : interviewDetails.getQuestions()) {
                question.setInterview(interview);
                questionRepository.save(question);
            }
            
            return interviewRepository.save(interview);
        } else {
            return null; // Handle interview not found case
        }
    }

    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }

    public List<Interview> getInterviewsByTitle(String title) {
        return interviewRepository.findByTitle(title);
    }

    public List<Interview> getInterviewsByRoundName(String roundName) {
        return interviewRepository.findByRoundName(roundName);
    }

    public List<Interview> getUpcomingInterviews(LocalDate date) {
        return interviewRepository.findByScheduleDateAfter(date);
    }

    public List<Interview> getInterviewsByStudentId(Long studentId) {
        return interviewRepository.findByStudentId(studentId);
    }

    public List<Interview> getInterviewsByInterviewerId(Long interviewerId) {
        return interviewRepository.findByInterviewerId(interviewerId);
    }

    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    public List<Interview> getInterviewsByScheduleDate(LocalDate date) {
        return interviewRepository.findByScheduleDate(date);
    }

    public List<Interview> getInterviewsByScheduleTime(LocalTime scheduleTime) {
        return interviewRepository.findByScheduleTime(scheduleTime);
    }

    public Interview updateInterviewByDate(LocalDate date, Interview interviewDetails) {
        List<Interview> interviews = interviewRepository.findByScheduleDate(date);
        if (!interviews.isEmpty()) {
            Interview interview = interviews.get(0); // Assuming date is unique
            interview.setTitle(interviewDetails.getTitle());
            interview.setDescription(interviewDetails.getDescription());
            interview.setRoundName(interviewDetails.getRoundName());
            interview.setScheduleDate(interviewDetails.getScheduleDate());
            interview.setScheduleTime(interviewDetails.getScheduleTime());
            
            // Update questions
            for (Question question : interviewDetails.getQuestions()) {
                question.setInterview(interview);
                questionRepository.save(question);
            }
            
            return interviewRepository.save(interview);
        }
        return null;
    }

    public Interview updateInterviewByRoundName(String roundName, Interview interviewDetails) {
        List<Interview> interviews = interviewRepository.findByRoundName(roundName);
        if (!interviews.isEmpty()) {
            Interview interview = interviews.get(0); // Assuming roundName is unique
            interview.setTitle(interviewDetails.getTitle());
            interview.setDescription(interviewDetails.getDescription());
            interview.setRoundName(interviewDetails.getRoundName());
            interview.setScheduleDate(interviewDetails.getScheduleDate());
            interview.setScheduleTime(interviewDetails.getScheduleTime());
            
            // Update questions
            for (Question question : interviewDetails.getQuestions()) {
                question.setInterview(interview);
                questionRepository.save(question);
            }
            
            return interviewRepository.save(interview);
        }
        return null;
    }

    public void deleteInterviewsByRoundName(String roundName) {
        interviewRepository.deleteByRoundName(roundName);
    }
}