// InterviewCompletion.java
package com.mockinterview.mockinterview.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "interview_completions")
public class InterviewCompletion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "interview_id", nullable = false)
    private Interview interview;

    private boolean completed;

    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("studentName")
    private String studentName;

    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("interviewTitle")
    private String interviewTitle;

    // Other methods if needed
}
