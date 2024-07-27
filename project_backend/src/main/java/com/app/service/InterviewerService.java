package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.Repository.InterviewerRepository;
import com.app.models.Interviewer;

@Service
@Transactional
public class InterviewerService {

    @Autowired
    private InterviewerRepository interviewerRepository;

    public Interviewer saveInterviewer(Interviewer interviewer) {
        return interviewerRepository.save(interviewer);
    }

    public Optional<Interviewer> findInterviewerById(Long id) {
        return interviewerRepository.findById(id);
    }

    public void deleteInterviewer(Long id) {
        interviewerRepository.deleteById(id);
    }

    public Optional<Interviewer> findByEmailAndPassword(String email, String password) {
        return interviewerRepository.findByEmailAndPassword(email, password);
    }

    public int updatePassword(String password, String email) {
        return interviewerRepository.updatePassword(password, email);
    }
}
