package com.mockinterview.mockinterview.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    private String email;
    private String password;
    private String contact;
    private String photo;

    // @Column(nullable = true) // Allows null values
    private Double ratings; // Use Double to handle null values

    private String dept;
    private String batch;
    private String section;
    private String registerNo;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "mentorId")
    private Mentor mentor;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private List<Feedback> feedbacks;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    private List<Interview> interviews;
}
