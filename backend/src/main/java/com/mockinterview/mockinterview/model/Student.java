package com.mockinterview.mockinterview.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student extends User {
    private String contact;
    private Double ratings;
    private String dept;
    private String batch;
    private String section ;
    private String registerNo;
    private String photo;
    @OneToMany
    private List<Interview> interviews;

    @OneToMany
    private List<Feedback> feedbacks;

    @ManyToOne
    @JoinColumn(name = "mentorId")
    private Mentor mentor;
}
