package com.mockinterview.mockinterview.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistrationRequest {
    private String name;
    private String email;
    private String password;
    private String photo;
    private Set<String> roles;
}
