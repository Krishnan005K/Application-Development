package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.Repository.FeedbackRepository;
import com.app.models.Feedback;

@Service
@Transactional
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Optional<Feedback> findFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    public List<Feedback> findByInterviewId(Long interviewId) {
        return feedbackRepository.findByInterviewId(interviewId);
    }

    public List<Feedback> findByCandidateId(Long candidateId) {
        return feedbackRepository.findByCandidateId(candidateId);
    }
}
