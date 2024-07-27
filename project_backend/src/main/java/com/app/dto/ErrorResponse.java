package com.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ErrorResponse {
	private String message;
	private LocalDateTime timeStamp=LocalDateTime.now();
	public ErrorResponse(String message) {
		super();
		this.message = message;
	}
	
}
