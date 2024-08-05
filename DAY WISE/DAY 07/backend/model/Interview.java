package com.mockinterview.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String type;
    private LocalDate scheduleDate;
    private LocalTime scheduleTime;

    @OneToMany(mappedBy = "interview", cascade = CascadeType.ALL)
    private List<Question> questions;

    @JsonIgnore
    @ManyToOne
    private Student student;

    @JsonIgnore
    @ManyToOne
    private Interviewer interviewer;

    
}
