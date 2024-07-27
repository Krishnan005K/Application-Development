package com.app.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interviewer")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Interviewer extends BaseEntity {

    @NotEmpty(message = "Name can't be blank")
    @Size(min = 3, max = 45, message = "Invalid Name length")
    @Column(length = 45)
    private String name;

    @NotEmpty(message = "Email can't be blank")
    @Email(message = "Invalid Email format")
    @Size(max = 50, message = "Invalid Email length")
    @Column(length = 50, unique = true)
    private String email;

    @NotEmpty(message = "Password can't be blank")
    @Size(min = 4, max = 30, message = "Invalid Password length")
    @Column(length = 30)
    private String password;

    // Additional fields specific to interviewer can be added here
}
