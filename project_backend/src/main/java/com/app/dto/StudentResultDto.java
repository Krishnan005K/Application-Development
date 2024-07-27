package com.app.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentResultDto {
private int rid;
private int sid;
private String examid;
private String classes;
private String subject;
private int marks;
private int max_mark;
private String status;
private String session;


}
