package com.mockinterview.backend.service;

import com.mockinterview.backend.model.Interview;
import com.mockinterview.backend.model.Question;
import com.mockinterview.backend.repository.InterviewRepository;
import com.mockinterview.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
            interview.setType(interviewDetails.getType());
            interview.setScheduleDate(interviewDetails.getScheduleDate());
            interview.setScheduleTime(interviewDetails.getScheduleTime());
            
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

    public List<Interview> getInterviewsByType(String type) {
        return interviewRepository.findByType(type);
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
}
