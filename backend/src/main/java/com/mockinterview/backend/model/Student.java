package com.mockinterview.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String contact;
    private String photo;
    private double ratings;
    private String dept;
    private String batch;
    private String section;

    @ManyToOne
    private Mentor mentor;

    @OneToMany(mappedBy = "student")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "student")
    private List<Interview> interviews;

    // Getters and setters
}
