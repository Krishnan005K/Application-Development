package com.mockinterview.mockinterview.dto;

import lombok.Data;

@Data
public class FeedbackDTO {
    private Long id;
    private String feedback;
    private double accuracy;
    private double relevance;
    private double efficiency;
    private double rating;
    private Long studentId;
    private Long interviewId;
}
