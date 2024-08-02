package com.mockinterview.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
@Entity
public class Interviewer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String photo;

    @OneToMany(mappedBy = "interviewer")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "interviewer")
    private List<Interview> interviews;

    // Getters and setters
}
