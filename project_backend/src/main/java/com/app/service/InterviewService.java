package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.Repository.InterviewRepository;
import com.app.models.Interview;

@Service
@Transactional
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    public Interview saveInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    public Optional<Interview> findInterviewById(Long id) {
        return interviewRepository.findById(id);
    }

    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }

    public List<Interview> findByCandidateId(Long candidateId) {
        return interviewRepository.findByCandidateId(candidateId);
    }

    public List<Interview> findByInterviewerId(Long interviewerId) {
        return interviewRepository.findByInterviewerId(interviewerId);
    }

    public int rescheduleInterview(String scheduledDate, Long id) {
        return interviewRepository.rescheduleInterview(scheduledDate, id);
    }
}
