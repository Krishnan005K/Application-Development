package com.mockinterview.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String type;
    private String scheduleDate;
    private String scheduleTime;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Interviewer interviewer;

    @ManyToOne
    private Admin admin;

    // Getters and setters
}
