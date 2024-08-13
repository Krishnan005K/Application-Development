// InterviewCompletionService.java
package com.mockinterview.mockinterview.service;

import com.mockinterview.mockinterview.model.InterviewCompletion;
import com.mockinterview.mockinterview.repository.InterviewCompletionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewCompletionService {

    @Autowired
    private InterviewCompletionRepository interviewCompletionRepository;

    public InterviewCompletion addInterviewCompletion(InterviewCompletion interviewCompletion) {
        InterviewCompletion savedCompletion = interviewCompletionRepository.save(interviewCompletion);
        setTransientFields(savedCompletion);
        return savedCompletion;
    }

    public InterviewCompletion updateInterviewCompletion(Long id, InterviewCompletion interviewCompletionDetails) {
        Optional<InterviewCompletion> existingCompletion = interviewCompletionRepository.findById(id);
        if (existingCompletion.isPresent()) {
            InterviewCompletion interviewCompletion = existingCompletion.get();
            interviewCompletion.setCompleted(interviewCompletionDetails.isCompleted());
            InterviewCompletion updatedCompletion = interviewCompletionRepository.save(interviewCompletion);
            setTransientFields(updatedCompletion);
            return updatedCompletion;
        }
        return null;
    }

    public void deleteInterviewCompletion(Long id) {
        interviewCompletionRepository.deleteById(id);
    }

    public List<InterviewCompletion> getAllInterviewCompletions() {
        List<InterviewCompletion> completions = interviewCompletionRepository.findAll();
        completions.forEach(this::setTransientFields);
        return completions;
    }

    public List<InterviewCompletion> getInterviewCompletionsByStudentId(Long studentId) {
        List<InterviewCompletion> completions = interviewCompletionRepository.findByStudentId(studentId);
        completions.forEach(this::setTransientFields);
        return completions;
    }

    public List<InterviewCompletion> getInterviewCompletionsByInterviewId(Long interviewId) {
        List<InterviewCompletion> completions = interviewCompletionRepository.findByInterviewId(interviewId);
        completions.forEach(this::setTransientFields);
        return completions;
    }

    private void setTransientFields(InterviewCompletion interviewCompletion) {
        interviewCompletion.setStudentName(interviewCompletion.getStudent().getName());
        interviewCompletion.setInterviewTitle(interviewCompletion.getInterview().getTitle());
    }
}
