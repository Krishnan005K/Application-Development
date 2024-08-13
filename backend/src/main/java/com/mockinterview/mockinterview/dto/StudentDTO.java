package com.mockinterview.mockinterview.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    private String name;
    private String email;
    private String photo;
    private String password;
    private String contact;
    private Double ratings;
    private String dept;
    private String batch;
    private String section;
    private String registerNo;
    private String mentorName;
}
