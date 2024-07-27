package com.app.models;

import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "feedback")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Feedback extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "interview_id", nullable = false)
    private Interview interview;

    @Column(length = 1000)
    @NotEmpty(message = "Feedback cannot be blank")
    private String feedbackText;

    @Column(nullable = false)
    private int rating; // Rating out of 5
}
