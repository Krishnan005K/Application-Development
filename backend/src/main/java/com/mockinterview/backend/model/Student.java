package com.mockinterview.backend.model;

import jakarta.persistence.Column;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column( nullable = false, unique = true)
    private String email;
    private String password;
    private String contact;
    private String photo;
    private double ratings;
    private String dept;
    private String batch;
    private String section;

    @JsonIgnore
    @ManyToOne
    private Mentor mentor;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private List<Feedback> feedbacks;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private List<Interview> interviews;

    // Getters and setters
}
