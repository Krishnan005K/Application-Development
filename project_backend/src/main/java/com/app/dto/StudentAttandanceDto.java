package com.app.dto;

import java.time.LocalDate;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentAttandanceDto {
private int aid;
private int sid;
private String name;
private String classes;
private LocalDate date;
private String status;
private String session;

}
