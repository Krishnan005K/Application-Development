package com.app.models;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User extends BaseEntity {
    @Column(length = 45)
    @NotEmpty(message ="Name can't be blank")
    @Length(min = 3, max = 45, message = "Invalid Name length!!!!")
    private String name;

    @Column(length = 30, unique = true)
    @Email(message = "Invalid email format!!!!")
    @NotEmpty(message = "Email cannot be blank")
    private String email;

    @Column(length = 30)
    @NotEmpty(message ="Password cannot be blank")
    @Length(min = 4, max = 30, message = "Invalid password length!!!!")
    private String password;

    @Column(length = 15)
    @NotEmpty(message ="Role cannot be blank")
    private String role; // Candidate or Interviewer
}
