package com.app.models;

import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Interview extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    @ManyToOne
    @JoinColumn(name = "interviewer_id", nullable = false)
    private User interviewer;

    @Column(length = 50)
    @NotEmpty(message ="Interview type cannot be blank")
    private String interviewType; // Technical, Behavioral, etc.

    @Column(nullable = false)
    @Future(message = "Interview date must be in the future")
    private LocalDateTime scheduledDate;

    @Column(length = 255)
    private String questions;
}
