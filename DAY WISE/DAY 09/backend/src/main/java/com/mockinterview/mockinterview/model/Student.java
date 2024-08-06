// Student.java
package com.mockinterview.mockinterview.model;

import jakarta.persistence.Entity;
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
public class Student extends User {
    private String contact;
    private Double ratings;
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
