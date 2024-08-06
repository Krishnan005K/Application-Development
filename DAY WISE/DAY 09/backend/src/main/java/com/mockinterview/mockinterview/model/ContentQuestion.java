package com.mockinterview.mockinterview.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ContentQuestion extends Question {
    private String keywords; // CSV of keywords
}
