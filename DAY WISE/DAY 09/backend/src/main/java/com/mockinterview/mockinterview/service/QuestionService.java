package com.mockinterview.mockinterview.service;


import com.mockinterview.mockinterview.model.Question;
import com.mockinterview.mockinterview.model.ContentQuestion;
import com.mockinterview.mockinterview.model.MCQQuestion;
import com.mockinterview.mockinterview.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(Long id, Question questionDetails) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setQuestionText(questionDetails.getQuestionText());
            if (question instanceof MCQQuestion) {
                ((MCQQuestion) question).setOptions(((MCQQuestion) questionDetails).getOptions());
                ((MCQQuestion) question).setCorrectOption(((MCQQuestion) questionDetails).getCorrectOption());
            } else if (question instanceof ContentQuestion) {
                ((ContentQuestion) question).setKeywords(((ContentQuestion) questionDetails).getKeywords());
            }
            return questionRepository.save(question);
        } else {
            return null; // Handle question not found case
        }
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public List<Question> getQuestionsByInterviewId(Long interviewId) {
        return questionRepository.findByInterviewId(interviewId);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
}
