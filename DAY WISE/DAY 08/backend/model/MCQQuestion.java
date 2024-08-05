package com.mockinterview.backend.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MCQQuestion extends Question {
    private String options; // CSV of options
    private String correctOption;
}
