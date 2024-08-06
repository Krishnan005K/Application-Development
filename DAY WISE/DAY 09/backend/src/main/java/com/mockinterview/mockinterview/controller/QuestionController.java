package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.Question;
import com.mockinterview.mockinterview.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_INTERVIEWER')")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_INTERVIEWER')")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question questionDetails) {
        Question updatedQuestion = questionService.updateQuestion(id, questionDetails);
        if (updatedQuestion != null) {
            return ResponseEntity.ok(updatedQuestion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_INTERVIEWER')")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/interview/{interviewId}")
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_STUDENT', 'ROLE_HEAD', 'ROLE_ADMIN')")
    public ResponseEntity<List<Question>> getQuestionsByInterviewId(@PathVariable Long interviewId) {
        return ResponseEntity.ok(questionService.getQuestionsByInterviewId(interviewId));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_INTERVIEWER', 'ROLE_STUDENT', 'ROLE_HEAD', 'ROLE_ADMIN')")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }
}
